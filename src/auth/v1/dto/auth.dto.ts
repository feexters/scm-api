import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { User } from 'src/users/entities';
import { UserModel } from 'src/users/models/user.model';

export class BaseAuthRequestDto extends PickType(UserModel, ['username', 'email']) {
  @ApiProperty({ example: 'password1234', minLength: 6, maxLength: 24 })
  @IsString()
  @Length(6, 24)
  password: string;
}

export class AuthSignInDto extends PickType(BaseAuthRequestDto, ['email', 'password']) {}

export class AuthSignUpDto extends PickType(BaseAuthRequestDto, ['username', 'email', 'password']) {}

export class AuthResponseDto {
  @ApiProperty({ type: UserModel })
  user?: UserModel;

  @ApiProperty({ example: 'token' })
  token: string;

  constructor(data: Partial<AuthResponseDto>) {
    Object.assign(this, data);
  }

  static create(props: Partial<Omit<AuthResponseDto, 'user'> & { user?: User }>): AuthResponseDto {
    return new AuthResponseDto({
      ...props,
      user: props.user ? UserModel.create(props.user) : undefined,
    });
  }
}
