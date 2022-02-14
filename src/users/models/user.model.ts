import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { User } from '../entities';

export class UserModel {
  @ApiProperty({ example: 'cf61390c-36bc-4c0b-954b-da303258d472' })
  id: string;

  @ApiProperty({ example: 'user1', minLength: 4, maxLength: 36 })
  @IsString()
  @Length(4, 36)
  username: string;

  @ApiProperty({ example: 'example@gmail.com' })
  @ApiProperty()
  @IsEmail()
  email: string;

  constructor(data: Partial<UserModel>) {
    Object.assign(this, data);
  }

  static create(props: Partial<User>): UserModel {
    return new UserModel({
      ...props,
    });
  }
}
