import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AnimeModule } from './anime/anime.module';
import { WatchlistModule } from './watchlist/watchlist.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [AuthModule, UserModule, AnimeModule, WatchlistModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'dev_db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    })
    , GraphQLModule.forRoot<ApolloDriverConfig>(
      {
        driver: ApolloDriver,
        autoSchemaFile: true,
        playground: true
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
