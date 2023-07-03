import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AnimeModule } from './anime/anime.module';
import { WatchlistModule } from './watchlist/watchlist.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { User } from './user/user.entity';


declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}

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
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({ path: "/anime", method: RequestMethod.GET })
  }

}
