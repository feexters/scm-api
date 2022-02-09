import { Screen } from 'src/screens/entities';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

const tableName = 'playlists';

@Entity({
  name: tableName,
})
export class Playlist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  screenId: string;

  @OneToOne(() => Screen, (screen) => screen.playlist)
  @JoinColumn({
    name: 'screenId',
    referencedColumnName: 'id',
  })
  screen: Screen;

  @ManyToOne(() => User, (user) => user.playlists)
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id',
  })
  user: User;
}
