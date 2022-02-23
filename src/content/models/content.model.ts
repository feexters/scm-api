import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { ContentAttachmentModel } from 'src/content-attachments/models/content-attachment.model';
import { ContentMediaType } from '../content.types';
import { Content } from '../entities';

export class ContentModel {
  @ApiProperty({ example: 'cf61390c-36bc-4c0b-954b-da303258d472' })
  id: string;

  @ApiProperty({
    example: 'https://media-link.com/cf61390c-36bc-4c0b-954b-da303258d47',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsUrl({ protocols: ['http', 'https'], require_protocol: true })
  mediaUrl?: string;

  @IsEnum(ContentMediaType)
  @ApiProperty({ example: ContentMediaType.IMAGE, enum: ContentMediaType })
  mediaType: ContentMediaType;

  @ApiProperty({ example: 'cf61390c-36bc-4c0b-954b-da303258d472' })
  userId: string;

  @ApiProperty({ type: ContentAttachmentModel, isArray: true, nullable: true })
  attachments?: ContentAttachmentModel[];

  constructor(data: Partial<ContentModel>) {
    Object.assign(this, data);
  }

  static create(props: Partial<Content>): ContentModel {
    return new ContentModel({
      ...props,
      attachments: props.attachments
        ? props.attachments.map((attachment) => ContentAttachmentModel.create(attachment))
        : undefined,
    });
  }
}
