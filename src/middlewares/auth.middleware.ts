import { BadRequestException, Injectable, NestMiddleware, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";
import { User } from "../user/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";









@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService,
        @InjectRepository(User) private userRepo: Repository<User>) { }
    async use(req: Request, res: Response, next: (error?: NextFunction) => void) {

        const token = req.cookies.authoization as string;
        if (token) {

            try {
                const decodedToken = await this.jwtService.verifyAsync(token, { secret: `SomeSecret` });
                const curruser = await this.userRepo.findOne({ where: { id: decodedToken.userId } })
                if (!curruser) throw new NotFoundException("Unable to verify user")
                req.user = curruser;
                next()
            } catch {
                throw new BadRequestException("Incorrect token")
            }


        }
        else {
            throw new UnauthorizedException("No token found")
        }

    }

}