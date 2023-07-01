import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private userService: UserService, private readonly jwt: JwtService) { }
    async login({ email, password }: { email: string, password: string }) {

        const user = await this.userService.findUserByEmail(email);
        if (user) {
            if (await bcrypt.compare(password, user.password)) {

                const payload = { userId: user.id, email: user.email }
                return this.jwt.signAsync(payload)

            }

            throw new HttpException(`Bad Email or Password`, 400)
        }

        return null;
    }
}
