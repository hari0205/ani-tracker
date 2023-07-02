import { Exclude } from "class-transformer";
import { User } from "../user.entity";
import { IsString } from "class-validator";
import { Field, InputType } from "@nestjs/graphql";

interface UpdateDto {

    name: string;
    password: string;
}


@InputType()
export class UpdateUserDto implements UpdateDto {

    @Exclude()
    email: string;

    @IsString()
    @Field()
    name: string;

    @IsString()
    @Field()
    password: string;

    @Exclude()
    id: string;
}