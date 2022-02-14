import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Playlist } from '../../playlists/entities/playlist.entity';
import { Content } from '../../content/entities/content.entity';

const tableName = 'playlist_content';

@Entity({
  name: tableName,
})
export class PlaylistContent {
  static tableName = tableName;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  playlistId: string;

  @Column({ type: 'uuid' })
  contentId: string;

  @ManyToOne(() => Playlist, (playlist) => playlist.playlistContentPlaylists)
  playlist: Playlist;

  @ManyToOne(() => Content, (content) => content.playlistContentContent)
  content: Content;
}
