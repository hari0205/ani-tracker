import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from "cookie-parser";
import * as session from "express-session"

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'debug', 'log', 'verbose']
  });
  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser())
  await app.listen(3000);
}
bootstrap();
