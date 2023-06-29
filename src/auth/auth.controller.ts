import { Controller, Body, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly userService: UserService) {

    }


    @Post("create-user")
    async signup(@Body() createUserDto: CreateUserDto) {
        const user = await this.userService.create_user(createUserDto);
        return user;
    }
}
