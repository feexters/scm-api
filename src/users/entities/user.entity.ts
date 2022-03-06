import { Event } from 'src/events/entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Screen } from '../../screens/entities/screen.entity';
import { Playlist } from '../../playlists/entities/playlist.entity';
import { Content } from '../../content/entities/content.entity';

const tableName = 'users';

@Entity({
  name: tableName,
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  authId: string;

  @Column({ type: 'text', unique: true, nullable: true })
  username: string;

  @Column({ type: 'text', unique: true, nullable: true })
  email: string;

  @OneToMany(() => Event, (event) => event.user)
  events: Event[];

  @OneToMany(() => Screen, (screen) => screen.user)
  screens: Screen[];

  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playlists: Playlist[];

  @OneToMany(() => Content, (content) => content.user)
  content: Content[];
}
