import { Injectable } from '@nestjs/common';
import { PlaylistContentRepository } from '../../repositories/playlist-content.repository';

@Injectable()
export class PlaylistContentService {
  constructor(
    private readonly playlistContentRepository: PlaylistContentRepository,
  ) {}

  async addContentToPlaylist({
    playlistId,
    contentId,
  }: {
    playlistId: string;
    contentId: string;
  }): Promise<void> {
    const playlistContentCreated = this.playlistContentRepository.create({
      playlistId,
      contentId,
    });

    console.log(playlistContentCreated);
  }
}
