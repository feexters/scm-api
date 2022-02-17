import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Playlist } from 'src/playlists/entities';
import { PlaylistsRepository } from 'src/playlists/repositories';
import { CreatePlaylistDto } from '../dto';

@Injectable()
export class PlaylistsService extends TypeOrmCrudService<Playlist> {
  constructor(
    @InjectRepository(PlaylistsRepository)
    public readonly playlistsRepository: PlaylistsRepository,
  ) {
    super(playlistsRepository);
  }

  async createPlaylist(
    createScreenDto: CreatePlaylistDto,
    { screenId, userId }: { screenId: string; userId: string },
  ): Promise<Playlist> {
    const playlistCreated = this.playlistsRepository.create({
      screenId,
      userId,
      ...createScreenDto,
    });

    return this.playlistsRepository.save(playlistCreated);
  }
}
