import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Watchlist } from './watchlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Anime } from '../anime/anime.entity';

@Injectable()
export class WatchlistService {
    constructor(@InjectRepository(Watchlist) private readonly watchListRepo: Repository<Watchlist>,
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        @InjectRepository(Anime) private readonly animeRepo: Repository<Anime>) { }

    async getAllWatchlistwithCount() {
        const [watchLists, count] = await this.watchListRepo.findAndCount({
            relations: ["user", "anime"],

        })
        return [watchLists, count];

    }

    async getAllWatchList() {
        return await this.watchListRepo.find({
            relations: ["user", "anime"],

        })


    }

    async getWatchlistById(id: number) {
        const watchlist = await this.watchListRepo.findOne({
            where: { id },
            relations: ["user", "anime"]
        })
        if (!watchlist) {
            return new HttpException("Watchlist not found", HttpStatus.NOT_FOUND)
        }

        return watchlist;
    }

    async createWatchlist({ status, animeId, userId }: { status: string, animeId: number, userId: string }) {
        const anime = await this.animeRepo.findOneBy({ id: animeId })
        if (!anime) {
            return new NotFoundException({ statusCode: 404, message: "Anime not found." })

        }

        const user = await this.userRepo.findOneBy({ id: userId })
        if (!user) {
            return new NotFoundException({ statusCode: 404, message: "user not found." })

        }

        const watchlist = new Watchlist()
        watchlist.status = status
        watchlist.anime = Promise.resolve(anime)
        watchlist.user = Promise.resolve(user)


        const savedWatchlist = await this.watchListRepo.save(watchlist)
        console.log(savedWatchlist);
    }
}
