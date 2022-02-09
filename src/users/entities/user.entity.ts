import { Event } from 'src/events/entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'text', select: false })
  password: string;

  @OneToMany(() => Event, (event) => event.user)
  events: Event[];
}
