import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ContentAttachmentsRepository } from 'src/content-attachments/repositories';
import { ContentAttachment } from '../../entities/content-attachment.entity';
import { CreateContentAttachmentDto } from '../dto';
import { DeleteResult } from 'typeorm';

@Injectable()
export class ContentAttachmentsService extends TypeOrmCrudService<ContentAttachment> {
  constructor(public readonly contentAttachmentsRepository: ContentAttachmentsRepository) {
    super(contentAttachmentsRepository);
  }

  async createAttachment(createScreenDto: CreateContentAttachmentDto, contentId: string): Promise<ContentAttachment> {
    const contentAttachmentCreated = this.contentAttachmentsRepository.create({
      contentId,
      ...createScreenDto,
    });

    return this.contentAttachmentsRepository.save(contentAttachmentCreated);
  }

  async deleteAttachment({
    contentId,
    attachmentId,
  }: {
    contentId: string;
    attachmentId: string;
  }): Promise<DeleteResult> {
    return this.contentAttachmentsRepository.delete({ contentId, id: attachmentId });
  }
}
