import { Controller, Get, Param, HttpException, HttpStatus, Patch, Body, UseInterceptors, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ExcludeProperties } from '../interceptors/update-interceptor';

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

    @Patch(":id")
    @UseInterceptors(ExcludeProperties)
    async patchUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        const updatedUser = await this.userService.updateUser(id, updateUserDto)
        if (!updatedUser) throw new HttpException(`Unable to update user`, 500)
        return { message: "User updated successfully" }
    }

    @Delete(":id")
    async deleteUser(@Param('id') id: string) {
        const deletedUser = await this.userService.deleteUser(id);
        if (!deletedUser) throw new HttpException(`Unable to delete user`, 500)
        return { message: "User deleted successfully" }
    }
}
