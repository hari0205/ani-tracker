import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { CreateWatchListDto } from './dtos/create-watchlis.dto';

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
        const wl = await this.watchlistService.getWatchlistById(id)
        console.log(wl)
        return wl;
    }

    @Post()
    async CreateWatchList(@Body() createWatchList: CreateWatchListDto) {
        return await this.watchlistService.createWatchlist(createWatchList);
    }
}
