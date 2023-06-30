import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';

@Module({
  controllers: [AuthController],
  imports: [UserModule, TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: `SomeSecret`,
      signOptions: {
        expiresIn: "1d",
      }
    })],
  providers: [AuthService, UserService, AuthResolver],

})
export class AuthModule { }
