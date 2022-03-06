import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { passportJwtSecret } from 'jwks-rsa';
import { AuthJwtService } from './v1/services';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './v1/dto';
import { User } from 'src/users/entities';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly configService: ConfigService, private readonly authJwtService: AuthJwtService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${configService.get<string>('auth0.issuerUrl')}.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: configService.get<string>('auth0.audience'),
      issuer: `${configService.get<string>('auth0.issuerUrl')}`,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    return this.authJwtService.validateUser(payload);
  }
}
