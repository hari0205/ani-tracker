import { Field, InputType } from "@nestjs/graphql";
import { IsNumber, IsOptional, IsString, Max, Min } from "class-validator";




interface UpdateWatchList {
    status?: string;
    progress?: number;
}


@InputType()
export class UpdateWatchListDto implements UpdateWatchList {

    @IsString()
    @Field()
    status?: string;

    @IsNumber()
    @Min(1)
    @Max(10)
    @IsOptional()
    rating?: number;

    @IsOptional()
    @IsNumber()
    progress?: number;

}