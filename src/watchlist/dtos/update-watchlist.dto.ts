import { Field, InputType } from "@nestjs/graphql";
import { IsString } from "class-validator";




interface UpdateWatchList {
    status: string;
}


@InputType()
export class UpdateWatchListDto implements UpdateWatchList {

    @IsString()
    @Field()
    status: string;

}