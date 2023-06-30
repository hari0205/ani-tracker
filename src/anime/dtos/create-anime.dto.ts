import { IsBoolean, IsNumber, IsString } from "class-validator";







// class Watch {
//     @IsNumber()
//     id: number;

//     @IsString()
//     status: string;


// }

export class CreateAnimeDto {

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