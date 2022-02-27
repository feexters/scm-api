import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Content } from 'src/content/entities';
import { ContentRepository } from 'src/content/repositories';
import { DeleteResult } from 'typeorm';
import { AwsService } from '../../../aws/v1/services/aws.service';
import { getFileKeyFromUrl } from '../../../common/utils/get-file-key-from-url';

@Injectable()
export class ContentService extends TypeOrmCrudService<Content> {
  constructor(
    @InjectRepository(ContentRepository)
    public readonly contentRepository: ContentRepository,
    private readonly awsService: AwsService,
  ) {
    super(contentRepository);
  }

  async deleteContent(contentId: string): Promise<DeleteResult> {
    const content = await this.contentRepository.findOne({ id: contentId });

    if (!content) {
      return null;
    }

    await Promise.allSettled([
      this.awsService.removeFileFromS3(getFileKeyFromUrl(content.mediaUrl)),
      ...(content.attachments?.map((item) => this.awsService.removeFileFromS3(getFileKeyFromUrl(item.source))) || []),
    ]);

    return this.contentRepository.delete({ id: contentId });
  }
}
