import { PickType } from '@nestjs/swagger';
import { EventModel } from 'src/events/models/event.model';

export class UpdateEventDto extends PickType(EventModel, ['name']) {}

export class CreateEventDto extends PickType(EventModel, ['name']) {}
