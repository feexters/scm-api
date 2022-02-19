import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PlaylistsController } from './v1/playlists.controller';
import { PlaylistsService } from './v1/services';
import { PlaylistsRepository } from './repositories';
import { PlaylistContentService } from 'src/playlist-content/v1/services';
import { PlaylistContentRepository } from 'src/playlist-content/repositories';

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistsRepository, PlaylistContentRepository])],
  controllers: [PlaylistsController],
  providers: [PlaylistsService, PlaylistContentService],
})
export class PlaylistsModule {}
