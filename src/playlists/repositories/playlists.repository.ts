import { EntityRepository, Repository } from 'typeorm';
import { Playlist } from '../entities';

@EntityRepository(Playlist)
export class PlaylistsRepository extends Repository<Playlist> {
  async isPlaylistOwner({
    playlistId,
    userId,
  }: {
    playlistId: string;
    userId: string;
  }): Promise<boolean> {
    const playlist = await this.findOne({ id: playlistId, userId });

    if (!playlist) {
      return false;
    }

    return true;
  }
}
