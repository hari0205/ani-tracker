import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Anime } from './anime.entity';
import { Repository } from 'typeorm';
import { CreateAnimeDto } from './dtos/create-anime.dto';
import { UpdateAnimeDto } from './dtos/update-anime.dto';
import { Watchlist } from '../watchlist/watchlist.entity';


@Injectable()
export class AnimeService {
    constructor(@InjectRepository(Anime) private readonly animeRepo: Repository<Anime>,
        @InjectRepository(Watchlist) private readonly watchlistRepo: Repository<Watchlist>) {

    }

    async findAllAnime(skip?: number, limit?: number) {
        const [animes, count] = await this.animeRepo.findAndCount({ order: { name: "ASC" }, skip, take: limit });
        return { data: animes, total: count, limit, skip };
    }

    async findAllAnimewithoutCount() {
        return this.animeRepo.find({
            order: { name: "ASC" },
            relations: {
                watchlist: true,
            }
        });
    }

    async findAnime(id: number) {
        // TODO: Refactor this later
        const averageRating = await this.animeRepo
            .createQueryBuilder('anime')
            .leftJoin('anime.watchlist', 'watchlist')
            .select('AVG(CASE WHEN watchlist.rating >0 THEN watchlist.rating ELSE NULL END)', 'averageRating')
            .where('anime.id = :id', { id })
            .getRawOne()




        await this.animeRepo.createQueryBuilder().update(Anime).set({ rating: averageRating.averageRating }).where("id = :id", { id }).execute()
        return await this.animeRepo.findOne({ where: { id }, relations: { watchlist: true } })


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
