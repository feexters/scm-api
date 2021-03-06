import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from 'src/events/entities';
import { User } from '../../users/entities/user.entity';
import { Playlist } from '../../playlists/entities/playlist.entity';

const tableName = 'screens';

@Entity({
  name: tableName,
})
export class Screen {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  name?: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  eventId: string;

  @ManyToOne(() => Event, (event) => event.screens)
  @JoinColumn({
    name: 'eventId',
    referencedColumnName: 'id',
  })
  event: Event;

  @ManyToOne(() => User, (user) => user.screens)
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id',
  })
  user: User;

  @OneToOne(() => Playlist, (playlist) => playlist.screen)
  playlist: Playlist;
}
