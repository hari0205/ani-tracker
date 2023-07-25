import { Controller, Get, Param, HttpException, HttpStatus, Patch, Body, UseInterceptors, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ExcludeProperties } from '../interceptors/update-interceptor';
import { UserInterceptor } from './interceptors/user-res.interceptor';
import { ResponseDto } from './dtos/response-user.dto';
import { PaginationDto } from './dtos/pagination.dto';
import { User } from './user.entity';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {

    }
    @Get('all')
    @UseInterceptors(new UserInterceptor(ResponseDto))
    async getAllUsers(@Query() PaginationDto: PaginationDto) {
        const { page, limit } = PaginationDto
        const skip: number = (page - 1) * limit;
        const itemsPerPage: number = limit;
        const [users, count] = await this.userService.findAllUserswithCount(skip, itemsPerPage)
        return { users, count, skip, limit }
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
