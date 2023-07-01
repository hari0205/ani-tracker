import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Anime } from './anime.entity';
import { Repository } from 'typeorm';
import { CreateAnimeDto } from './dtos/create-anime.dto';
import { UpdateAnimeDto } from './dtos/update-anime.dto';

@Injectable()
export class AnimeService {
    constructor(@InjectRepository(Anime) private readonly animeRepo: Repository<Anime>) {

    }

    async findAllAnime() {
        const [animes, count] = await this.animeRepo.findAndCount();
        return { data: animes, count };
    }


    async findAnime(id: number) {
        const anime = await this.animeRepo.findOneBy({ id })
        return anime
    }

    async addAnime(body: CreateAnimeDto) {
        const newanime = this.animeRepo.create(body);
        return await this.animeRepo.save(newanime)
    }

    async updateAnime(id: number, body: UpdateAnimeDto) {
        const updatedAnime = await this.animeRepo.update({ id }, body);
        if (!updatedAnime) return null;
        return updatedAnime;
    }

    async deleteAnime(id: number) {
        const deleteAnime = await this.animeRepo.delete(id);
        if (!deleteAnime) return null;
        return deleteAnime;
    }

}
