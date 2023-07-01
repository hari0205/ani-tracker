
import { Field, ObjectType } from "@nestjs/graphql"






@ObjectType()
export class AuthType {

    @Field({ nullable: true })
    token?: string;


}