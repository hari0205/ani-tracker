import { MiddlewareConsumer, Module, NestMiddleware, NestModule } from '@nestjs/common';
import { AnimeController } from './anime.controller';
import { AnimeService } from './anime.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Anime } from './anime.entity';
import { AnimeResolver } from './anime.resolvers';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Watchlist } from '../watchlist/watchlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Anime, User, Watchlist])],
  controllers: [AnimeController],
  providers: [AnimeService, AnimeResolver, JwtService]
})

export class AnimeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes("/watchlist")
  }
}
