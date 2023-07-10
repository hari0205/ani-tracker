import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { WatchlistController } from './watchlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Watchlist } from './watchlist.entity';
import { WatchListResolver } from './watchlist.resolver';
import { User } from '../user/user.entity';
import { Anime } from '../anime/anime.entity';
import { AuthMiddleware } from '../middlewares/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Watchlist, Anime, User])],
  providers: [WatchlistService, WatchListResolver],
  controllers: [WatchlistController]
})
export class WatchlistModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude(
      { path: 'watchlist', method: RequestMethod.GET },
    )
  }
}
