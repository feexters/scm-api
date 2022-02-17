import { CreateEventDto, UpdateEventDto } from './dto';
import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
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
import { ScreensService } from '../../screens/v1/services/screens.service';
import { CreateScreenDto } from 'src/screens/v1/dto';
import { ScreenModel } from 'src/screens/models';

@ApiTags('[v1] Events')
@Crud({
  model: {
    type: EventModel,
  },
  params: {
    eventId: {
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
    only: [
      'getOneBase',
      'updateOneBase',
      'deleteOneBase',
      'createOneBase',
      'getManyBase',
    ],
    getOneBase: {
      decorators: [Public()],
    },
    getManyBase: {
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
  constructor(
    public service: EventsService,
    private screensService: ScreensService,
  ) {}

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

  @Post(':eventId/screens')
  @ApiOkResponse({ type: ScreenModel })
  @ApiBearerAuth()
  async createScreen(
    @IAM('id') userId: string,
    @Param('eventId') eventId: string,
    @ParsedBody() dto: CreateScreenDto,
  ): Promise<ScreenModel> {
    const screen = await this.screensService.createScreen(dto, {
      eventId,
      userId,
    });

    return ScreenModel.create(screen);
  }
}
