import { IsNumber, IsOptional, IsString, IsUUID, Max, Min, isNumber, max } from "class-validator";


export class CreateWatchListDto {

    @IsString()
    status: string;

    @IsNumber()
    progress?: number;

    @IsNumber()
    animeId: number;

    @IsUUID()
    @IsOptional()
    userId: string;

    @IsNumber()
    @Max(10)
    @IsOptional()
    rating?: number;
}