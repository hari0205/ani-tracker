import { Field, InputType, Int } from "@nestjs/graphql";
import { IsBoolean, IsNumber, IsString } from "class-validator";


@InputType()
export class CreateAnimeDto {

    @Field()
    @IsString()
    name: string;

    @IsString()
    @Field()
    romanjiName: string;

    @IsString()
    @Field()
    description: string;

    @IsString()
    @Field()
    airingFrom: string;

    @IsBoolean()
    @Field()
    isAiring: boolean;

    @IsNumber()
    @Field(() => Int)
    totalEpisodes: number;

    @IsBoolean()
    @Field()
    isSequel: boolean;



}