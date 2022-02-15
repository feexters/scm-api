import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { Screen } from '../entities';

export class ScreenModel {
  @ApiProperty({ example: 'cf61390c-36bc-4c0b-954b-da303258d472' })
  id: string;

  @ApiProperty({ example: 'screen name', nullable: true, maxLength: 36 })
  @IsString()
  @MaxLength(36)
  name?: string;

  @ApiProperty({ example: 'cf61390c-36bc-4c0b-954b-da303258d472' })
  eventId: string;

  @ApiProperty({ example: 'cf61390c-36bc-4c0b-954b-da303258d472' })
  userId: string;

  constructor(data: Partial<ScreenModel>) {
    Object.assign(this, data);
  }

  static create(props: Partial<Screen>): ScreenModel {
    return new ScreenModel({
      ...props,
    });
  }
}
