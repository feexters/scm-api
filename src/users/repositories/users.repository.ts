import { AuthSignInDto } from 'src/auth/dto';
import { getHashedPassword } from 'src/common/utils';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async findByCredentials({ email, password }: AuthSignInDto): Promise<User> {
    return this.findOne({ email, password: getHashedPassword(password) });
  }
}
