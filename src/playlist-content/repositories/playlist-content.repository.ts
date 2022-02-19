import { EntityRepository, Repository } from 'typeorm';
import { POSITION_STEP } from '../constants';
import { PlaylistContent } from '../entities/playlist-content.entity';

@EntityRepository(PlaylistContent)
export class PlaylistContentRepository extends Repository<PlaylistContent> {
  async getListByPlaylistId(playlistId: string): Promise<PlaylistContent[]> {
    const playlistContent = await this.createQueryBuilder(PlaylistContent.tableName)
      .where(`${PlaylistContent.tableName}."playlistId" = '${playlistId}'`)
      .orderBy(`${PlaylistContent.tableName}."position"`, 'ASC')
      .getMany();

    return playlistContent;
  }

  async rebalancePositions(playlistId: string): Promise<void> {
    return this.query(`
      with ranked_playlist_content as (
        select pc."contentId",  row_number() over(partition by pc."playlistId" order by position) * ${POSITION_STEP} position_rank
        from playlist_content pc
        where pc."playlistId" = '${playlistId}'
        order by  pc."playlistId", pc."position" asc
      )

      update playlist_content
      set "position" = (
        select pc_rank.position_rank
        from ranked_playlist_content pc_rank
        where playlist_content."contentId" = pc_rank."contentId"
      )
      where "playlistId" = '${playlistId}'
    `);
  }
}
