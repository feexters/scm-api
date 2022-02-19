import { BadRequestException, Injectable } from '@nestjs/common';
import { PlaylistContentRepository } from '../../repositories/playlist-content.repository';
import { AddContentToPlaylistRequestDto } from '../dto/playlist-content.dto';
import { PlaylistContent } from '../../entities/playlist-content.entity';
import { POSITION_STEP } from '../../constants/playlist-content.constants';

@Injectable()
export class PlaylistContentService {
  constructor(private readonly playlistContentRepository: PlaylistContentRepository) {}

  async addContentToPlaylist(
    { contentId, beforeContentId }: AddContentToPlaylistRequestDto,
    playlistId: string,
  ): Promise<PlaylistContent> {
    const playlistContentList = await this.playlistContentRepository.getListByPlaylistId(playlistId);

    let position = this.getInsertPositionOfList(playlistContentList, beforeContentId);

    if (position === null) {
      position = await this.getInsertPositionWithRebalance({ playlistId, beforeContentId });
    }

    const alreadyExistsContent = playlistContentList.find((item) => item.contentId === contentId);

    const playlistContentCreated = this.playlistContentRepository.create({
      playlistId,
      contentId,
      position,
    });

    const playlistContent = await this.playlistContentRepository.save({
      ...alreadyExistsContent,
      ...playlistContentCreated,
    });

    return playlistContent;
  }

  private getInsertPositionOfList = (
    playlistContentList: PlaylistContent[],
    beforeContentId?: string,
  ): number | null => {
    if (!playlistContentList.length) {
      return POSITION_STEP;
    }

    const beforeInsertItemIndex = playlistContentList.findIndex((item) => item.contentId === beforeContentId);

    if (beforeContentId && beforeInsertItemIndex < 0) {
      throw new BadRequestException('there is no such content in the playlist');
    }

    if (beforeInsertItemIndex < 0) {
      return playlistContentList[playlistContentList.length - 1].position + POSITION_STEP;
    }

    const afterPosition = beforeInsertItemIndex === 0 ? 0 : playlistContentList[beforeInsertItemIndex - 1].position;
    const beforePosition = playlistContentList[beforeInsertItemIndex].position;

    const freePositionsInterval = beforePosition - afterPosition;

    if (freePositionsInterval < 2) {
      return null;
    }

    const position = afterPosition + Math.floor(freePositionsInterval / 2);

    return position;
  };

  private async getInsertPositionWithRebalance({
    playlistId,
    beforeContentId,
  }: {
    playlistId: string;
    beforeContentId?: string;
  }): Promise<number> {
    await this.playlistContentRepository.rebalancePositions(playlistId);
    const updatedList = await this.playlistContentRepository.getListByPlaylistId(playlistId);

    return this.getInsertPositionOfList(updatedList, beforeContentId) || POSITION_STEP;
  }
}
