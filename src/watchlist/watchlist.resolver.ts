import { Resolver, Query, ResolveField, Parent, Args, Int } from "@nestjs/graphql";
import { Watchlist } from "./watchlist.entity";
import { User } from "src/user/user.entity";
import { WatchlistService } from "./watchlist.service";
import { Anime } from "../anime/anime.entity";













@Resolver(() => Watchlist)
export class WatchListResolver {

    @ResolveField("anime")
    async anime(@Parent() watch: Watchlist) {
        return await watch.anime
    }

    @ResolveField("user")
    async user(@Parent() watch: Watchlist) {
        return await watch.user
    }

    constructor(private readonly watchlistService: WatchlistService) { }
    @Query(() => [Watchlist])
    async getAllWatchlist() {
        const watchlists = await this.watchlistService.getAllWatchList();
        return watchlists;
    }

    @Query(() => Watchlist)
    async getWatchlist(@Args("id", { type: () => Int }) id: number) {
        const watchlist = await this.watchlistService.getWatchlistById(id);
        return watchlist;
    }
}