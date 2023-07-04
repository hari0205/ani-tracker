import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm"
import { User } from './user.entity';
import { Repository, getRepository } from 'typeorm';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from 'src/auth/dtos/create-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {
    }


    async create_user(create: CreateUserDto) {

        const new_user = this.userRepo.create(create);

        return await this.userRepo.save(new_user);
    }

    async find_user(id: string) {
        if (!id) return null;
        const userQuery = this.userRepo.createQueryBuilder("user");
        userQuery
            .leftJoinAndSelect('user.animesWatching', 'watchlist') // LEFTJOIN 
            .leftJoinAndSelect('watchlist.anime', 'anime')          // LEFTJOIN
            .select(['user.id', 'user.name', 'user.role', 'watchlist.id', 'watchlist.status', 'anime.id', 'anime.name'])
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

    async updateUser(id: string, updatedUser: UpdateUserDto) {

        const user = await this.userRepo.findOne({ where: { id } })
        if (!user) return null;
        try {
            const res = await this.userRepo.update(id, updatedUser)
            if (!res) throw new Error("Field error.");
            return res;
        }

        catch (err) {
            console.log(err);
        }
    }


    async deleteUser(id: string) {
        const user = await this.userRepo.findOne({ where: { id } })
        if (!user) return null;
        try {
            const res = await this.userRepo.delete({ id })
            if (!res) throw new Error("Field error.");
            return res;
        }

        catch (err) {
            return err;
        }
    }
}