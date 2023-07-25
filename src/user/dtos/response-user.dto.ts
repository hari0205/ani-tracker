import { Expose } from "class-transformer";
import { User } from "../user.entity";

// Omit<Partial<User>, "password">

@Expose()
export class ReponseUser implements Omit<Partial<User>, "password"> {

    @Expose()
    id?: string;

    @Expose()
    name?: string;

    @Expose()
    email?: string;

    @Expose()
    role?: string;
}

@Expose()
export class ResponseDto {

    @Expose()
    users: ReponseUser[];

    @Expose()
    count: number;


    @Expose()
    skip: number;

    @Expose()
    limit: number;

}