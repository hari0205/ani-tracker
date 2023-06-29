import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';

@Module({
  controllers: [AuthController],
  imports: [UserModule, TypeOrmModule.forFeature([User])],
  providers: [AuthService, UserService],

})
export class AuthModule { }
