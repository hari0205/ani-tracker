import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";
import { Field, InputType } from "@nestjs/graphql";



interface updateAnime {

    name?: string;
    romanjiName?: string;
    description?: string;
    airingFrom?: string;
    isAiring?: boolean;
    totalEpisodes?: number;
    isSequel?: boolean;
}


@InputType()
export class UpdateAnimeDto implements updateAnime {
    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    name: string;

    @IsString()
    @Field({ nullable: true })
    @IsOptional()
    romanjiName: string;

    @IsString()
    @Field({ nullable: true })
    @IsOptional()
    description: string;

    @IsString()
    @Field({ nullable: true })
    @IsOptional()
    airingFrom: string;

    @IsBoolean()
    @Field({ nullable: true })
    @IsOptional()
    isAiring: boolean;

    @IsNumber()
    @Field({ nullable: true })
    @IsOptional()
    totalEpisodes: number;

    @IsBoolean()
    @Field({ nullable: true })
    @IsOptional()
    isSequel: boolean;

}