import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentAttachmentsRepository } from './repositories';
import { ContentAttachmentsService } from './v1/services/content-attachments.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContentAttachmentsRepository])],
  providers: [ContentAttachmentsService],
})
export class ContentAttachmentsModule {}
