import { User } from 'src/users/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

const tableName = 'entities';

@Entity({
  name: tableName,
})
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => User, (user) => user.events)
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id',
  })
  user: User;
}
