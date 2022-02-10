import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { User } from 'src/users/entities';

export class AuthSignInDto extends PickType(User, ['password', 'email']) {
  @ApiProperty({ example: 'password1234', minLength: 6, maxLength: 24 })
  password: string;
}

export class AuthSignUpDto extends PickType(User, [
  'username',
  'password',
  'email',
]) {
  @ApiProperty({ example: 'password1234', minLength: 6, maxLength: 24 })
  password: string;
}

export class AuthResponseDto extends OmitType(User, ['password']) {
  token: string;
}

export class JwtPayload extends PickType(User, ['id', 'email']) {
  expiration: Date;
}
