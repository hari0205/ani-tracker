import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Anime } from './anime.entity';
import { Repository } from 'typeorm';
import { CreateAnimeDto } from './dtos/create-anime.dto';

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


}
