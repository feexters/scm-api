import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/users/repositories';
import { AuthController } from './v1/auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { AuthJwtService, JWTConfigService, AuthService } from './v1/services';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([UsersRepository]),
    JwtModule.registerAsync({
      useClass: JWTConfigService,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AuthJwtService],
  exports: [PassportModule, JwtStrategy],
})
export class AuthModule {}
