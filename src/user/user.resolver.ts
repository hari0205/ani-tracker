import { Args, ID, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dtos/update-user.dto";








@Resolver(() => User)
export class UserResolver {

    constructor(private readonly userService: UserService) { }


    @ResolveField("animesWatching")
    async animesWatching(@Parent() user: User) {
        return await user.animesWatching;
    }

    @Query(() => [User])
    async getUsers() {
        const users = await this.userService.findAllUsers()
        return users;
    }

    @Query(() => User)
    async getUser(@Args('email') EmailAddress: string) {

        return this.userService.findUserByEmail(EmailAddress);
    }

    @Mutation(() => String)
    async updateUser(@Args("id") id: string, @Args("input") input: UpdateUserDto) {
        const user = this.userService.updateUser(id, input);
        if (!user) return "Unable to update user!";
        return "User Update Success!";
    }

    @Mutation(() => String)
    async deleteUser(@Args("id") id: string) {
        const user = this.userService.deleteUser(id);
        if (!user) return "Unable to update user!";
        return "User Update Success!";
    }
}