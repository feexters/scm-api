import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistsRepository } from 'src/playlists/repositories';
import { PlaylistsService } from 'src/playlists/v1/services';
import { ScreensRepository } from './repositories';
import { ScreensController } from './v1/screens.controller';
import { ScreensService } from './v1/services';

@Module({
  imports: [TypeOrmModule.forFeature([ScreensRepository, PlaylistsRepository])],
  controllers: [ScreensController],
  providers: [ScreensService, PlaylistsService],
})
export class ScreensModule {}
