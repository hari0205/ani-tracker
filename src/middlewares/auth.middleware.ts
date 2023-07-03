import { BadRequestException, Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
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

        const token = req.cookies.authoization;
        if (token) {
            try {
                const decodedToken = await this.jwtService.verifyAsync(token);
                req.user = await this.userRepo.findOne({ where: { id: decodedToken.id } })
                next()
            } catch {
                throw new BadRequestException('Invalid token signature');
            }

        }

        throw new UnauthorizedException("No token found")

    }

}