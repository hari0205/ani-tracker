import { Resolver, Query, ResolveField, Parent, Args, Int, Mutation } from "@nestjs/graphql";
import { Watchlist } from "./watchlist.entity";
import { User } from "src/user/user.entity";
import { WatchlistService } from "./watchlist.service";
import { Anime } from "../anime/anime.entity";
import { UpdateWatchListDto } from "./dtos/update-watchlist.dto";













@Resolver(() => Watchlist)
export class WatchListResolver {

    constructor(private readonly watchlistService: WatchlistService) { }

    @ResolveField("anime", () => Anime)
    async anime(@Parent() watch: Watchlist) {
        return await watch.anime
    }

    @ResolveField("user", () => User)
    async user(@Parent() watch: Watchlist) {
        return await watch.user
    }

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

    @Mutation(() => String)
    async updateWatchlist(@Args("id", { type: () => Int }) id: number, @Args("input") input: UpdateWatchListDto) {
        const watchlist = await this.watchlistService.updateWatchlist(id, input);
        if (!watchlist) return "Unable to update watchlist!";
        return "Watchlist updated!"
    }


    @Mutation(() => String)
    async deleteWatchlist(@Args("id", { type: () => Int }) id: number) {
        const watchlist = await this.watchlistService.deleteWatchlist(id);
        if (!watchlist) return "Unable to delete watchlist!";
        return "Watchlist deleted!"
    }
}