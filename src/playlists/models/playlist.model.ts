import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { Playlist } from '../entities/playlist.entity';

export class PlaylistModel {
  @ApiProperty({ example: 'cf61390c-36bc-4c0b-954b-da303258d472' })
  id: string;

  @ApiProperty({ example: 'playlist name', nullable: true, maxLength: 36 })
  @IsString()
  @Length(2, 36)
  name: string;

  @ApiProperty({ example: 'cf61390c-36bc-4c0b-954b-da303258d472' })
  screenId: string;

  @ApiProperty({ example: 'cf61390c-36bc-4c0b-954b-da303258d472' })
  userId: string;

  constructor(data: Partial<PlaylistModel>) {
    Object.assign(this, data);
  }

  static create(props: Partial<Playlist>): PlaylistModel {
    return new PlaylistModel({
      ...props,
    });
  }
}
