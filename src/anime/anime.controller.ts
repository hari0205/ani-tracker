import { Controller, Post, Body, Get, Param, Patch, Delete, HttpException, UseGuards } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { CreateAnimeDto } from './dtos/create-anime.dto';
import { UpdateAnimeDto } from './dtos/update-anime.dto';
import { Roles } from '../decorators/role.decorator';
import { RolesGuard } from '../guards/role-guard';

@Controller('anime')
export class AnimeController {
    constructor(private readonly animeService: AnimeService) { }

    @Post()
    @Roles("admin")
    @UseGuards(RolesGuard)
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

    @Patch(":id")
    async updateAnime(@Param("id") id: number, @Body() updateAnime: UpdateAnimeDto) {
        const updatedAnime = await this.animeService.updateAnime(id, updateAnime);
        if (!updatedAnime) throw new HttpException("Unable to update anime", 500)
        return { message: "Anime details updated!" }
    }

    @Delete(":id")
    async deleteAnime(@Param("id") id: number) {
        const deltedAnime = await this.animeService.deleteAnime(id);
        if (!deltedAnime) throw new HttpException("Unable to update anime", 500)
        return { message: "Anime deleted!" }
    }

}
