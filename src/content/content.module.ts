import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentRepository } from './repositories';
import { ContentController } from './v1/content.controller';
import { ContentService } from './v1/services';

@Module({
  imports: [TypeOrmModule.forFeature([ContentRepository])],
  controllers: [ContentController],
  providers: [ContentService],
})
export class ContentModule {}
