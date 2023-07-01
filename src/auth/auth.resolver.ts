import { Resolver, Mutation, Args, Query } from "@nestjs/graphql"
import { AuthService } from "./auth.service";
import { AuthType } from "./auth.gql.type";
import { LoginDto } from "./dtos/login.dto";
import { UserService } from "../user/user.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { User } from "../user/user.entity";








@Resolver(() => AuthType)
export class AuthResolver {

    constructor(private readonly authService: AuthService,
        private readonly userService: UserService) {

    }

    @Mutation(() => String)
    async login(@Args("input") input: LoginDto): Promise<String> {
        return await this.authService.login(input);
    }

    @Mutation(() => User)
    async signup(@Args("input") input: CreateUserDto) {
        return await this.userService.create_user(input);
    }


}