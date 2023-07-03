import { Controller, Body, Post, HttpException, HttpStatus, Session, HttpCode, Res, Req } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { Response } from "express"

@Controller('auth')
export class AuthController {

    constructor(private readonly userService: UserService, private readonly authService: AuthService) {

    }


    @Post("create-user")
    async signup(@Body() createUserDto: CreateUserDto) {
        const user = await this.userService.create_user(createUserDto);
        return user;
    }

    @Post("login")
    @HttpCode(200)
    async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
        const token = await this.authService.login(loginDto);
        if (!token) throw new HttpException("User not found", HttpStatus.NOT_FOUND)
        res.cookie("authoization", token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })
        return {
            "statusCode": HttpStatus.OK,
            "message": "Login successful!",
            "token": token
        }
    }
}
