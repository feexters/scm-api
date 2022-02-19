import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Public } from 'src/common/decorators';
import {
  AddContentToPlaylistRequestDto,
  AddContentToPlaylistResponseDto,
} from 'src/playlist-content/v1/dto/playlist-content.dto';
import { PlaylistModel } from '../models';
import { CreatePlaylistDto, UpdatePlaylistDto } from './dto';
import { PlaylistOwnerGuard } from './guards/playlist-owner.guard';
import { PlaylistsService } from './services';
import { PlaylistContentService } from '../../playlist-content/v1/services/playlist-content.service';
import { DeleteResult } from 'typeorm';

@ApiTags('[v1] Playlist')
@Crud({
  model: {
    type: PlaylistModel,
  },
  params: {
    playlistId: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
  dto: {
    update: UpdatePlaylistDto,
    create: CreatePlaylistDto,
  },
  routes: {
    only: ['getOneBase', 'updateOneBase', 'deleteOneBase', 'getManyBase'],
    getOneBase: {
      decorators: [Public()],
    },
    getManyBase: {
      decorators: [Public()],
    },
    updateOneBase: {
      decorators: [UseGuards(PlaylistOwnerGuard), ApiBearerAuth()],
    },
    deleteOneBase: {
      decorators: [UseGuards(PlaylistOwnerGuard), ApiBearerAuth()],
    },
  },
})
@Controller('v1/playlists')
export class PlaylistsController implements CrudController<PlaylistModel> {
  constructor(public service: PlaylistsService, private playlistContentService: PlaylistContentService) {}

  @Post(':playlistId/content')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add content to playlist' })
  @UseGuards(PlaylistOwnerGuard)
  async addContent(
    @Param('playlistId') playlistId: string,
    @Body() addContentToPlaylistDto: AddContentToPlaylistRequestDto,
  ): Promise<AddContentToPlaylistResponseDto> {
    const playlistContent = await this.playlistContentService.addContentToPlaylist(addContentToPlaylistDto, playlistId);

    if (!playlistContent) {
      return { success: false };
    }

    return { success: true };
  }

  @Delete(':playlistId/content/:contentId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove content from playlist' })
  @UseGuards(PlaylistOwnerGuard)
  async deleteContent(
    @Param('playlistId') playlistId: string,
    @Param('contentId') contentId: string,
  ): Promise<DeleteResult> {
    return this.playlistContentService.deleteContentFromPlaylist({ contentId, playlistId });
  }
}
