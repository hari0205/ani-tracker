import { Module } from '@nestjs/common';
import { AnimeController } from './anime.controller';
import { AnimeService } from './anime.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Anime } from './anime.entity';
import { AnimeResolver } from './anime.resolvers';

@Module({
  imports: [TypeOrmModule.forFeature([Anime])],
  controllers: [AnimeController],
  providers: [AnimeService, AnimeResolver]
})
export class AnimeModule { }
