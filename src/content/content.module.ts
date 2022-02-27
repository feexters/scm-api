import { S3Service } from './../aws/v1/services/s3.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentRepository } from './repositories';
import { ContentController } from './v1/content.controller';
import { ContentService } from './v1/services';
import { ContentAttachmentsService } from '../content-attachments/v1/services/content-attachments.service';
import { ContentAttachmentsRepository } from 'src/content-attachments/repositories';
import { AwsService, CloudFilesStorageService } from 'src/aws/v1/services';

@Module({
  imports: [TypeOrmModule.forFeature([ContentRepository, ContentAttachmentsRepository])],
  controllers: [ContentController],
  providers: [ContentService, ContentAttachmentsService, AwsService, CloudFilesStorageService, S3Service],
})
export class ContentModule {}
