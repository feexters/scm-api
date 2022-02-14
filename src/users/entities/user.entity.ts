import { Event } from 'src/events/entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Screen } from '../../screens/entities/screen.entity';
import { Playlist } from '../../playlists/entities/playlist.entity';
import { Content } from '../../content/entities/content.entity';
import { Exclude } from 'class-transformer';

const tableName = 'users';

@Entity({
  name: tableName,
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  username: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'text', select: false })
  password: string;

  @OneToMany(() => Event, (event) => event.user)
  events: Event[];

  @OneToMany(() => Screen, (screen) => screen.user)
  screens: Screen[];

  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playlists: Playlist[];

  @OneToMany(() => Content, (content) => content.user)
  content: Content[];
}
