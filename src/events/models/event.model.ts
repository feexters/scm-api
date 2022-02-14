import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { Event } from '../entities';

export class EventModel {
  @ApiProperty({ example: 'cf61390c-36bc-4c0b-954b-da303258d472' })
  id: string;

  @ApiProperty({ example: 'event name', minLength: 2, maxLength: 36 })
  @IsString()
  @Length(2, 36)
  name: string;

  @ApiProperty({ example: 'cf61390c-36bc-4c0b-954b-da303258d472' })
  userId: string;

  constructor(data: Partial<EventModel>) {
    Object.assign(this, data);
  }

  static create(props: Partial<Event>): EventModel {
    return new EventModel({
      ...props,
    });
  }
}
