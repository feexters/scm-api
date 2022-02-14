import { PickType } from '@nestjs/swagger';
import { UserModel } from 'src/users/models';

export class JwtPayload extends PickType(UserModel, ['id', 'email']) {
  expiration: Date;
}
