import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersRepository } from 'src/users/repositories';
import { JwtPayload } from '../dto';

@Injectable()
export class AuthJwtService {
  constructor(private readonly jwtService: JwtService, private readonly usersRepository: UsersRepository) {}

  async verifyTokenAsync(token: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync(token);
  }

  async validateUser(payload: JwtPayload): Promise<User | null> {
    const user = await this.usersRepository.findOne({ authId: payload.sub });

    if (!user) {
      const createdUser = this.usersRepository.create({ authId: payload.sub });
      return this.usersRepository.save(createdUser);
    }

    return user;
  }
}
