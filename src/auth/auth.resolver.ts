import { Resolver, Mutation, Args, Query } from "@nestjs/graphql"
import { User } from "../user/user.entity";
import { AuthService } from "./auth.service";
import { AuthType } from "./auth.gql.type";
import { LoginDto } from "./dtos/login.dto";








@Resolver(() => AuthType)
export class AuthResolver {

    constructor(private readonly authService: AuthService) {

    }

    @Query(() => AuthType)
    getToken() {
        return "Hello"
    }



}