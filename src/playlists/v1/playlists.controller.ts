import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Public } from 'src/common/decorators';
import { PlaylistModel } from '../models';
import { CreatePlaylistDto, UpdatePlaylistDto } from './dto';
import { PlaylistOwnerGuard } from './guards/playlist-owner.guard';
import { PlaylistsService } from './services';

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
  constructor(public service: PlaylistsService) {}
}
