import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsUrl } from 'class-validator';
import { ContentMediaType } from '../content.types';
import { Content } from '../entities';

export class ContentModel {
  @ApiProperty({ example: 'cf61390c-36bc-4c0b-954b-da303258d472' })
  id: string;

  @ApiProperty({
    example: 'https://media-link.com/cf61390c-36bc-4c0b-954b-da303258d47',
  })
  @IsNotEmpty()
  @IsUrl({ protocols: ['http', 'https'], require_protocol: true })
  mediaUrl: string;

  @IsEnum(ContentMediaType)
  @ApiProperty({ example: ContentMediaType.IMAGE, enum: ContentMediaType })
  mediaType: ContentMediaType;

  @ApiProperty({ example: 'cf61390c-36bc-4c0b-954b-da303258d472' })
  userId: string;

  constructor(data: Partial<ContentModel>) {
    Object.assign(this, data);
  }

  static create(props: Partial<Content>): ContentModel {
    return new ContentModel({
      ...props,
    });
  }
}
