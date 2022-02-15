import { PickType } from '@nestjs/swagger';
import { PlaylistModel } from 'src/playlists/models';

export class UpdatePlaylistDto extends PickType(PlaylistModel, ['name']) {}

export class CreatePlaylistDto extends PickType(PlaylistModel, ['name']) {}
