import { Exclude } from "class-transformer";
import { User } from "../user.entity";
import { IsString } from "class-validator";

interface UpdateDto {

    name: string;
    password: string;
}



export class UpdateUserDto extends User implements UpdateDto {

    @Exclude()
    email: string;

    @IsString()
    name: string;

    @IsString()
    password: string;

    @Exclude()
    id: string;
}