import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { CreateAnimeDto } from './dtos/create-anime.dto';

@Controller('anime')
export class AnimeController {
    constructor(private readonly animeService: AnimeService) { }

    @Post()
    async createAnime(@Body() createAnime: CreateAnimeDto) {
        return this.animeService.addAnime(createAnime);
    }

    @Get()
    async getAllAnimes() {
        return this.animeService.findAllAnime()
    }

    @Get(":id")
    async getAnime(@Param("id") id: number) {
        return this.animeService.findAnime(id);
    }


}
