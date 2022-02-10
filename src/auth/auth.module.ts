import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/users/repositories';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { AuthJwtService } from './services/auth-jwt.service';
import { AuthService } from './services/auth.service';
import { JWTConfigService } from './services/jwt-config.service';

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
