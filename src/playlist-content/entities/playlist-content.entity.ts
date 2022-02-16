import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Playlist } from '../../playlists/entities/playlist.entity';
import { Content } from '../../content/entities/content.entity';

const tableName = 'playlist_content';

@Entity({
  name: tableName,
})
@Index('UNIQUE_PLAYLIST_AND_CONTENT_ID', ['playlistId', 'contentId'], {
  unique: true,
})
export class PlaylistContent {
  static tableName = tableName;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  playlistId: string;

  @Column({ type: 'uuid' })
  contentId: string;

  @Column({ type: 'int' })
  position: number;

  @ManyToOne(() => Playlist, (playlist) => playlist.playlistContentPlaylists)
  playlist: Playlist;

  @ManyToOne(() => Content, (content) => content.playlistContentContent)
  content: Content;
}
