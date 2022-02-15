import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Playlist } from 'src/playlists/entities';
import { PlaylistsRepository } from 'src/playlists/repositories';

@Injectable()
export class PlaylistsService extends TypeOrmCrudService<Playlist> {
  constructor(
    @InjectRepository(PlaylistsRepository)
    public readonly playlistsRepository: PlaylistsRepository,
  ) {
    super(playlistsRepository);
  }
}
