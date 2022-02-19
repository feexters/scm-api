import { EntityRepository, Repository } from 'typeorm';
import { Event } from '../entities';

@EntityRepository(Event)
export class EventsRepository extends Repository<Event> {
  async isEventOwner({ eventId, userId }: { eventId: string; userId: string }): Promise<boolean> {
    const event = await this.findOne({ id: eventId, userId });

    if (!event) {
      return false;
    }

    return true;
  }
}
