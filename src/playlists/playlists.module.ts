import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PlaylistsController } from './v1/playlists.controller';
import { PlaylistsService } from './v1/services';
import { PlaylistsRepository } from './repositories';

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistsRepository])],
  controllers: [PlaylistsController],
  providers: [PlaylistsService],
})
export class PlaylistsModule {}
