import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Content } from 'src/content/entities';
import { ContentRepository } from 'src/content/repositories';

@Injectable()
export class ContentService extends TypeOrmCrudService<Content> {
  constructor(
    @InjectRepository(ContentRepository)
    public readonly screensRepository: ContentRepository,
  ) {
    super(screensRepository);
  }
}
