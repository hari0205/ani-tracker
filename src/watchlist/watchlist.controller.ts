import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { CreateWatchListDto } from './dtos/create-watchlis.dto';
import { UpdateWatchListDto } from './dtos/update-watchlist.dto';

@Controller('watchlist')
export class WatchlistController {

    constructor(private readonly watchlistService: WatchlistService) { }

    @Get()
    async getWatchAlllist() {
        const [watchlists, count] = await this.watchlistService.getAllWatchlistwithCount()
        return {
            data: watchlists,
            count
        }
    }

    @Get(":id")
    async getWatchlist(@Param("id") id: number) {
        return await this.watchlistService.getWatchlistById(id)

    }

    @Post()
    async CreateWatchList(@Body() createWatchList: CreateWatchListDto) {
        return await this.watchlistService.createWatchlist(createWatchList);
    }


    @Patch(":id")
    async UpdateWatchList(@Param("id") id: number, @Body() updateWatchList: UpdateWatchListDto) {
        const updatedWatchlist = await this.watchlistService.updateWatchlist(id, updateWatchList)
        if (!updatedWatchlist) throw new HttpException(`Error updating watchlist`, 500)
        return { message: "Watchlist updated!" }
    }

    @Delete(":id")
    async DeleteWatchList(@Param("id") id: number) {
        const deletedWatchlist = await this.watchlistService.deleteWatchlist(id)
        if (!deletedWatchlist) throw new HttpException(`Error updating watchlist`, 500)
        return { message: "Watchlist deleted!" }
    }

}
