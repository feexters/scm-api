import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsUrl } from 'class-validator';
import { ContentOrientationType } from 'src/content/content.types';
import { ContentAttachment } from '../entitties/content-attachment.entity';

export class ContentAttachmentModel {
  @ApiProperty({ example: 'cf61390c-36bc-4c0b-954b-da303258d472' })
  id: string;

  @ApiProperty({
    example: 'https://media-link.com/cf61390c-36bc-4c0b-954b-da303258d47',
  })
  @IsNotEmpty()
  @IsUrl({ protocols: ['http', 'https'], require_protocol: true })
  source: string;

  @IsOptional()
  @IsEnum(ContentOrientationType)
  @ApiProperty({ example: ContentOrientationType.LANDSCAPE, enum: ContentOrientationType })
  orientation?: ContentOrientationType;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: '1920' })
  width?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: '1080' })
  height?: number;

  @ApiProperty({ example: 'cf61390c-36bc-4c0b-954b-da303258d472' })
  contentId: string;

  constructor(data: Partial<ContentAttachmentModel>) {
    Object.assign(this, data);
  }

  static create(props: Partial<ContentAttachment>): ContentAttachmentModel {
    return new ContentAttachmentModel({
      ...props,
    });
  }
}
