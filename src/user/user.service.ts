import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm"
import { User } from './user.entity';
import { Repository } from 'typeorm';
import UserNotFoundException from './exceptions/entity.exceptions';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {
    }


    async create_user({ email, password, name }: { email: string, password: string, name: string }) {

        const new_user = this.userRepo.create({ email, password, name });

        return await this.userRepo.save(new_user);
    }

    async find_user(id: string) {
        if (!id) return null;
        const userQuery = this.userRepo.createQueryBuilder("user");
        userQuery
            .leftJoinAndSelect('user.animesWatching', 'watchlist') // LEFTJOIN 
            .leftJoinAndSelect('watchlist.anime', 'anime')
            .select(['user.id', 'user.name', 'watchlist.id', 'watchlist.status', 'anime.id', 'anime.name'])
            .where('user.id = :userId', { userId: id })

        return userQuery.getOne();

    }

    async findUserByEmail(email: string) {
        if (!email) return null;
        const user = await this.userRepo.findOneBy({ email })
        return user;
    }

    async findAllUserswithCount() {
        const [users, count] = await this.userRepo.findAndCount()
        return { users, count };
    }

    async findAllUsers() {
        return this.userRepo.find()
    }
}