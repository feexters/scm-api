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
import { ContentModel } from '../models';
import { CreateContentDto } from './dto';
import { ContentOwnerGuard } from './guards';
import { ContentService } from './services';

@ApiTags('[v1] Content')
@Crud({
  model: {
    type: ContentModel,
  },
  params: {
    contentId: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
  dto: {
    create: CreateContentDto,
  },
  routes: {
    only: ['getOneBase', 'deleteOneBase', 'createOneBase', 'getManyBase'],
    getOneBase: {
      decorators: [Public()],
    },
    getManyBase: {
      decorators: [Public()],
    },
    deleteOneBase: {
      decorators: [UseGuards(ContentOwnerGuard), ApiBearerAuth()],
    },
  },
})
@Controller('v1/content')
export class ContentController implements CrudController<ContentModel> {
  constructor(public service: ContentService) {}

  @Override('createOneBase')
  @ApiBearerAuth()
  async createOne(
    @IAM('id') userId: string,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateContentDto,
  ): Promise<ContentModel> {
    const screen = await this.service.createOne(req, { ...dto, userId });

    return ContentModel.create(screen);
  }
}
