import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/users/repositories';
import { AuthSignUpDto, AuthSignInDto, JwtPayload } from '../dto/auth.dto';
import { getHashedPassword } from '../../common/utils/get-hashed-password';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/entities/user.entity';
import { LoginResultType } from '../types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(authSignUpDto: AuthSignUpDto): Promise<LoginResultType> {
    const userCreate = this.usersRepository.create({
      ...authSignUpDto,
      password: getHashedPassword(authSignUpDto.password),
    });

    const user = await this.usersRepository.save(userCreate);

    return this.login(user);
  }

  async signIn(authSignInDto: AuthSignInDto): Promise<LoginResultType> {
    const user = await this.usersRepository.findByCredentials(authSignInDto);

    if (!user) {
      throw new UnauthorizedException('incorrect password or email');
    }

    return this.login(user);
  }

  private login(user: User): LoginResultType {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userResponse } = user;

    const jwtPayload: JwtPayload = {
      id: userResponse.id,
      email: userResponse.email,
      expiration: new Date(),
    };

    return {
      ...userResponse,
      token: this.jwtService.sign(jwtPayload),
    };
  }
}
