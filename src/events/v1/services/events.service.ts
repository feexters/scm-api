import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Event } from 'src/events/entities';
import { EventsRepository } from 'src/events/repositories';

@Injectable()
export class EventsService extends TypeOrmCrudService<Event> {
  constructor(
    @InjectRepository(EventsRepository)
    public readonly eventsRepository: EventsRepository,
  ) {
    super(eventsRepository);
  }
}
