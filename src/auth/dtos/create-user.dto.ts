import { Field, InputType } from "@nestjs/graphql";
import { IsString, IsEmail } from "class-validator";




@InputType()
export class CreateUserDto {

    @IsString()
    @Field()
    name: string;

    @IsString()
    @IsEmail()
    @Field()
    email: string;

    @IsString()
    @Field()
    password: string;
}