import { Args, ID, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { User } from "./user.entity";
import { UserService } from "./user.service";








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

}