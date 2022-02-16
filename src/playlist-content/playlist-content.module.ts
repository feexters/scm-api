import { PlaylistContentRepository } from './repositories';
import { Module } from '@nestjs/common';
import { PlaylistContentService } from './v1/services';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistContentRepository])],
  providers: [PlaylistContentService],
})
export class PlaylistContentModule {}
