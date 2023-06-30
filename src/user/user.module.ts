import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserResolver } from './user.resolver';

@Module({
  controllers: [UserController],
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User])],
  providers: [UserService, AuthService, JwtService, UserResolver],
})
export class UserModule { }
