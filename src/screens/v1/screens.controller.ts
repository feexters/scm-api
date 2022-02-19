import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { IAM, Public } from 'src/common/decorators';
import { PlaylistModel } from 'src/playlists/models';
import { CreatePlaylistDto } from 'src/playlists/v1/dto';
import { PlaylistsService } from 'src/playlists/v1/services';
import { ScreenModel } from '../models';
import { CreateScreenDto, UpdateScreenDto } from './dto/screens.dto';
import { ScreenOwnerGuard } from './guards';
import { ScreensService } from './services';

@ApiTags('[v1] Screens')
@Crud({
  model: {
    type: ScreenModel,
  },
  params: {
    screenId: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
  dto: {
    update: UpdateScreenDto,
    create: CreateScreenDto,
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
      decorators: [UseGuards(ScreenOwnerGuard), ApiBearerAuth()],
    },
    deleteOneBase: {
      decorators: [UseGuards(ScreenOwnerGuard), ApiBearerAuth()],
    },
  },
})
@Controller('v1/screens')
export class ScreensController implements CrudController<ScreenModel> {
  constructor(public service: ScreensService, private playlistsService: PlaylistsService) {}

  @Post(':screenId/playlists')
  @ApiOkResponse({ type: PlaylistModel })
  @ApiBearerAuth()
  async createScreen(
    @IAM('id') userId: string,
    @Param('screenId') screenId: string,
    @Body() dto: CreatePlaylistDto,
  ): Promise<PlaylistModel> {
    const playlist = await this.playlistsService.createPlaylist(dto, {
      screenId,
      userId,
    });

    return PlaylistModel.create(playlist);
  }
}
