import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm"
import { User } from './user.entity';
import { Repository } from 'typeorm';
import UserNotFoundException from './exceptions/entity.exceptions';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {
    }


    async create_user({ email, password, name }) {

        const new_user = this.userRepo.create({ email, password, name });

        return await this.userRepo.save(new_user);
    }

    async find_user(id: string) {
        if (!id) return null;
        const user = await this.userRepo.findOneBy({ id })

        return user;

    }

    async findAllUsers() {
        const [users, count] = await this.userRepo.findAndCount()
        return { users, count };
    }
}