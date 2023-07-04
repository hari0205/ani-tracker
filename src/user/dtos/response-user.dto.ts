import { Expose } from "class-transformer";
import { User } from "../user.entity";






export class ResponseDto implements Omit<Partial<User>, "password"> {

    @Expose()
    id?: string;

    @Expose()
    name?: string;

    @Expose()
    email?: string;
}