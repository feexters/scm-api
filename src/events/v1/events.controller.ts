import { CreateEventDto, UpdateEventDto } from './dto';
import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { EventModel } from '../models/event.model';
import { IAM, Public } from 'src/common/decorators';
import { EventOwnerGuard } from './guards';
import { EventsService } from './services';

@ApiTags('[v1] Events')
@Crud({
  model: {
    type: EventModel,
  },
  params: {
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
  dto: {
    update: UpdateEventDto,
    create: CreateEventDto,
  },
  routes: {
    only: ['getOneBase', 'updateOneBase', 'deleteOneBase', 'createOneBase'],
    getOneBase: {
      decorators: [Public()],
    },
    updateOneBase: {
      decorators: [UseGuards(EventOwnerGuard), ApiBearerAuth()],
    },
    deleteOneBase: {
      decorators: [UseGuards(EventOwnerGuard), ApiBearerAuth()],
    },
  },
})
@Controller('v1/events')
export class EventsController implements CrudController<EventModel> {
  constructor(public service: EventsService) {}

  @Override('createOneBase')
  @ApiBearerAuth()
  async createOne(
    @IAM('id') userId: string,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateEventDto,
  ): Promise<EventModel> {
    const event = await this.service.createOne(req, { ...dto, userId });

    return EventModel.create(event);
  }
}
