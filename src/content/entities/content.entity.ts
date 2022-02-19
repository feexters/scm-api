import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ContentMediaType } from '../content.types';
import { User } from '../../users/entities/user.entity';
import { PlaylistContent } from 'src/playlist-content/entities';
import { OneToMany } from 'typeorm';

const tableName = 'content';

@Entity({
  name: tableName,
})
export class Content {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  mediaUrl: string;

  @Column({ type: 'enum', enum: ContentMediaType })
  mediaType: ContentMediaType;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => User, (user) => user.content)
  user: User;

  @OneToMany(() => PlaylistContent, (playlistContent) => playlistContent.content)
  playlistContentContent: PlaylistContent[];
}
