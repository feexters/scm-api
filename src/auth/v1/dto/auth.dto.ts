import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { UserModel } from 'src/users/models/user.model';

export class BaseAuthRequestDto extends PickType(UserModel, ['username', 'email']) {
  @ApiProperty({ example: 'password1234', minLength: 6, maxLength: 24 })
  @IsString()
  @Length(6, 24)
  password: string;
}

export class AuthSignInDto extends PickType(BaseAuthRequestDto, ['email', 'password']) {}

export class AuthSignUpDto extends PickType(BaseAuthRequestDto, ['username', 'email', 'password']) {}

export class AuthResponseDto extends UserModel {
  @ApiProperty({ example: 'token' })
  token: string;
}
