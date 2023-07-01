import { Resolver, Mutation, Args, Query } from "@nestjs/graphql"
import { AuthService } from "./auth.service";
import { AuthType } from "./auth.gql.type";
import { LoginDto } from "./dtos/login.dto";








@Resolver(() => AuthType)
export class AuthResolver {

    constructor(private readonly authService: AuthService) {

    }

    @Mutation(() => String)
    async login(@Args("input") input: LoginDto): Promise<String> {
        return await this.authService.login(input);


    }



}