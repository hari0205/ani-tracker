import { Controller, Body, Post, HttpException, HttpStatus, Session } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import UserNotFoundException from '../user/exceptions/entity.exceptions';

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
    async login(@Body() loginDto: LoginDto, @Session() session: Record<string, any>) {
        const user = await this.authService.login(loginDto);
        if (!user) throw new HttpException("User not found", HttpStatus.NOT_FOUND)
        session.userId = user.id;
        return {
            "statusCode": HttpStatus.OK,
            "message": "Login successful!"
        }
    }
}
