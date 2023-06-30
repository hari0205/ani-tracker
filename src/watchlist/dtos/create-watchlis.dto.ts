import { IsNumber, IsString, IsUUID } from "class-validator";


export class CreateWatchListDto {

    @IsString()
    status: string;

    @IsNumber()
    animeId: number;

    @IsUUID()
    userId: string;
}