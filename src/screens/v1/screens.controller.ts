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
import { IAM, Public } from 'src/common/decorators';
import { ScreenModel } from '../models';
import { CreateScreenDto, UpdateScreenDto } from './dto/screens.dto';
import { ScreenOwnerGuard } from './guards';
import { ScreensService } from './services';

@ApiTags('[v1] Screens')
@Crud({
  model: {
    type: ScreenModel,
  },
  params: {
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
    eventId: {
      field: 'eventId',
      type: 'uuid',
    },
  },
  dto: {
    update: UpdateScreenDto,
    create: CreateScreenDto,
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
      decorators: [UseGuards(ScreenOwnerGuard), ApiBearerAuth()],
    },
    deleteOneBase: {
      decorators: [UseGuards(ScreenOwnerGuard), ApiBearerAuth()],
    },
  },
})
@Controller('v1/events/:eventId/screens')
export class ScreensController implements CrudController<ScreenModel> {
  constructor(public service: ScreensService) {}

  @Override('createOneBase')
  @ApiBearerAuth()
  async createOne(
    @IAM('id') userId: string,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateScreenDto,
  ): Promise<ScreenModel> {
    const screen = await this.service.createOne(req, { ...dto, userId });

    return ScreenModel.create(screen);
  }
}
