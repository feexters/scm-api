import { PickType } from '@nestjs/swagger';
import { UserModel } from 'src/users/models';

export class UpdateUserDto extends PickType(UserModel, ['username']) {}
