import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {

    }
    @Get('all')
    async getAllUsers() {

        return await this.userService.findAllUsers()
    }

    @Get(":id")
    async getUser(@Param('id') id: string) {

        const user = await this.userService.find_user(id)
        if (!user) throw new HttpException(`User with given id not found. Please try again.`, HttpStatus.BAD_REQUEST)
        return user
    }


}
