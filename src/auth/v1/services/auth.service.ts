import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/users/repositories';
import { AuthSignUpDto, AuthSignInDto, JwtPayload } from '../dto';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from 'src/users/models';
import { LoginResultType } from 'src/auth/types';
import { getHashedPassword } from 'src/common/utils';
import { User } from 'src/users/entities';

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
    const jwtPayload: JwtPayload = {
      id: user.id,
      email: user.email,
      expiration: new Date(),
    };

    return {
      ...UserModel.create(user),
      token: this.jwtService.sign(jwtPayload),
    };
  }
}
