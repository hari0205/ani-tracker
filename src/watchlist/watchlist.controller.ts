import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, Req } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { CreateWatchListDto } from './dtos/create-watchlis.dto';
import { UpdateWatchListDto } from './dtos/update-watchlist.dto';
import { Watchlist } from './watchlist.entity';
import { Request } from 'express';

@Controller('watchlist')
export class WatchlistController {

    constructor(private readonly watchlistService: WatchlistService) { }

    @Get()
    async getAllList() {
        const [watchlists, count]: [Watchlist[], number] = await this.watchlistService.getAllWatchlistwithCount()
        const filteredWatchlist = await Promise.all(watchlists.map(async (watchlist) => {
            const { id, status, progress, rating, user, anime } = watchlist;

            const resolvedUser = await user
            const userObj = { id: resolvedUser.id, name: resolvedUser.name }

            const resolvedAnime = await anime
            const animeObj = { id: resolvedAnime.id, name: resolvedAnime.name }

            return { id, status, progress, rating, user: userObj, anime: animeObj };
        })

        )

        return { data: filteredWatchlist, count };




    }

    @Get(":id")
    async getWatchlist(@Param("id") id: number) {
        return await this.watchlistService.getWatchlistById(id)

    }

    @Post()
    async CreateWatchList(@Body() createWatchList: CreateWatchListDto, @Req() req: Request) {

        Object.assign(createWatchList, { userId: req.user.id });
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
