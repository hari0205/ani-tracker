import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private userService: UserService) { }
    async login({ email, password }) {

        const user = await this.userService.findUserByEmail(email)

        if (bcrypt.compare(password, user.password)) {

            return user;
        }

        return null;
    }
}
