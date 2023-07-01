import { IsString } from "class-validator";




interface UpdateWatchList {
    status: string;
}



export class UpdateWatchListDto implements UpdateWatchList {

    @IsString()
    status: string;

}