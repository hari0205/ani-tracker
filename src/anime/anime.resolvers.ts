import { Resolver, Query, Args, Int } from "@nestjs/graphql";
import { AnimeService } from "./anime.service";
import { Anime } from "./anime.entity";









@Resolver(() => Anime)
export class AnimeResolver {

    constructor(private readonly animeService: AnimeService) { }

    @Query(() => [Anime])
    async getAllAnime() {
        const animes = await this.animeService.findAllAnime();
        return animes;
    }

    @Query(() => Anime)
    async getAnimeById(@Args("id", { type: () => Int }) id: number) {
        const anime = await this.animeService.findAnime(id);
        return anime;
    }
}