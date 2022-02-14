import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from 'src/users/entities';
import { UsersRepository } from '../../repositories/users.repository';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(UsersRepository)
    public readonly usersRepository: UsersRepository,
  ) {
    super(usersRepository);
  }
}
