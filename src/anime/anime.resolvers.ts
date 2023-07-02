import { Resolver, Query, Args, Int, Mutation } from "@nestjs/graphql";
import { AnimeService } from "./anime.service";
import { Anime } from "./anime.entity";
import { CreateAnimeDto } from "./dtos/create-anime.dto";
import { UpdateAnimeDto } from "./dtos/update-anime.dto";









@Resolver(() => Anime)
export class AnimeResolver {

    constructor(private readonly animeService: AnimeService) { }

    @Query(() => [Anime])
    async getAllAnime(): Promise<Anime[]> {
        const animes = await this.animeService.findAllAnimewithoutCount();
        return animes;
    }

    @Query(() => Anime)
    async getAnimeById(@Args("id", { type: () => Int }) id: number): Promise<Anime> {
        const anime = await this.animeService.findAnime(id);
        return anime;
    }

    @Mutation(() => Anime)
    async createAnime(@Args("input") input: CreateAnimeDto): Promise<Anime> {
        return await this.animeService.addAnime(input);
    }

    @Mutation(() => String)
    async updateAnime(@Args("id", { type: () => Int }) id: number, @Args("input") input: UpdateAnimeDto) {
        const res = await this.animeService.updateAnime(id, input);
        if (!res) return "Unable to update anime"
        return "Anime updated successfully!";
    }

    @Mutation(() => String)
    async deleteAnime(@Args("id", { type: () => Int }) id: number) {
        const res = await this.animeService.deleteAnime(id);
        if (!res) return "Unable to delete anime"
        return "Anime deleted successfully!";
    }
}