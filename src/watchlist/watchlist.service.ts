import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Watchlist } from './watchlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Anime } from '../anime/anime.entity';
import { UpdateWatchListDto } from './dtos/update-watchlist.dto';

@Injectable()
export class WatchlistService {
    constructor(@InjectRepository(Watchlist) private readonly watchListRepo: Repository<Watchlist>,
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        @InjectRepository(Anime) private readonly animeRepo: Repository<Anime>) { }

    async getAllWatchlistwithCount() {
        const watchlists = await this.watchListRepo.findAndCount({
            relations: ["user", "anime"],
        })
        return watchlists;

    }

    async getAllWatchList() {
        return await this.watchListRepo.find({
            relations: ["user", "anime"],
        })


    }

    async getWatchlistById(id: number) {
        const watchlist = await this.watchListRepo.findOne({
            where: { id },
            relations: ["user", "anime"],
        })
        if (!watchlist) {
            return new HttpException("Watchlist not found", HttpStatus.NOT_FOUND)
        }

        return watchlist;
    }

    async createWatchlist({ status, animeId, userId }: { status: string, animeId: number, userId: string }) {
        const anime = await this.animeRepo.findOneBy({ id: animeId })
        if (!anime) {
            throw new NotFoundException({ statusCode: 404, message: "Anime not found." })

        }

        const user = await this.userRepo.findOneBy({ id: userId })
        if (!user) {
            throw new NotFoundException({ statusCode: 404, message: "User not found." })

        }

        const watchlist = this.watchListRepo.create()
        watchlist.status = status
        watchlist.anime = Promise.resolve(anime)
        watchlist.user = Promise.resolve(user)


        await this.watchListRepo.save(watchlist)

    }


    async updateWatchlist(id: number, updateData: UpdateWatchListDto) {
        const watchlist = await this.watchListRepo.findOneBy({ id });
        if (!watchlist) return null;
        const updatedWatchlist = await this.watchListRepo.update(id, updateData)
        return updatedWatchlist;
    }

    async deleteWatchlist(id: number) {
        const watchlist = await this.watchListRepo.findOneBy({ id });
        if (!watchlist) return null;
        const deletedWatchlist = await this.watchListRepo.delete(id)
        return deletedWatchlist;
    }
}
