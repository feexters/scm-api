import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentRepository } from './repositories';
import { ContentController } from './v1/content.controller';
import { ContentService } from './v1/services';
import { ContentAttachmentsService } from '../content-attachments/v1/services/content-attachments.service';
import { ContentAttachmentsRepository } from 'src/content-attachments/repositories';

@Module({
  imports: [TypeOrmModule.forFeature([ContentRepository, ContentAttachmentsRepository])],
  controllers: [ContentController],
  providers: [ContentService, ContentAttachmentsService],
})
export class ContentModule {}
