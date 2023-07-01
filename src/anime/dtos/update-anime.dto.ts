import { IsBoolean, IsNumber, IsString } from "class-validator";
import { CreateAnimeDto } from "./create-anime.dto";


interface updateAnime {

    name: string;
    romanjiName: string;
    description: string;
    airingFrom: string;
    isAiring: boolean;
    totalEpisodes: number;
    isSequel: boolean;
}



export class UpdateAnimeDto implements updateAnime {
    @IsString()
    name: string;

    @IsString()
    romanjiName: string;

    @IsString()
    description: string;

    @IsString()
    airingFrom: string;

    @IsBoolean()
    isAiring: boolean;

    @IsNumber()
    totalEpisodes: number;

    @IsBoolean()
    isSequel: boolean;

}