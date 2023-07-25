import { IsNumber, IsOptional, IsPositive, Min, isPositive } from "class-validator";
import { Type } from "class-transformer";







export class PaginationDto {


    @IsPositive()
    @Min(1)
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    page?: number = 1;


    @IsPositive()
    @Min(1)
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    limit?: number = 10;


}