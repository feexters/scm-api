import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { IAM, Public } from 'src/common/decorators';
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
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
    screenId: {
      field: 'screenId',
      type: 'uuid',
    },
  },
  dto: {
    update: UpdatePlaylistDto,
    create: CreatePlaylistDto,
  },
  routes: {
    only: [
      'getOneBase',
      'updateOneBase',
      'deleteOneBase',
      'createOneBase',
      'getManyBase',
    ],
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
@Controller('v1/screens/:screenId/playlists')
export class PlaylistsController implements CrudController<PlaylistModel> {
  constructor(public service: PlaylistsService) {}

  @Override('createOneBase')
  @ApiBearerAuth()
  async createOne(
    @IAM('id') userId: string,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreatePlaylistDto,
  ): Promise<PlaylistModel> {
    const event = await this.service.createOne(req, { ...dto, userId });

    return PlaylistModel.create(event);
  }
}
