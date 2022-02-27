import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { IAM, Public } from 'src/common/decorators';
import { ContentModel } from '../models';
import { CreateContentDto } from './dto';
import { ContentOwnerGuard } from './guards';
import { ContentService } from './services';
import { ContentAttachmentModel } from '../../content-attachments/models/content-attachment.model';
import { ContentAttachmentsService } from 'src/content-attachments/v1/services';
import { CreateContentAttachmentDto } from '../../content-attachments/v1/dto/content-attachment.dto';
import { DeleteResult } from 'typeorm';
import { ContentModelInterceptor } from './interceptors';

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
      interceptors: [ContentModelInterceptor],
    },
    getManyBase: {
      decorators: [Public()],
      interceptors: [ContentModelInterceptor],
    },
    deleteOneBase: {
      decorators: [UseGuards(ContentOwnerGuard), ApiBearerAuth()],
    },
  },
})
@Controller('v1/content')
export class ContentController implements CrudController<ContentModel> {
  constructor(public service: ContentService, private contentAttachmentsService: ContentAttachmentsService) {}

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

  @Post(':contentId/attachments')
  @ApiOkResponse({ type: ContentAttachmentModel })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add attachment from content' })
  async createScreen(
    @Param('contentId') contentId: string,
    @Body() dto: CreateContentAttachmentDto,
  ): Promise<ContentAttachmentModel> {
    const attachment = await this.contentAttachmentsService.createAttachment(dto, contentId);

    return ContentAttachmentModel.create(attachment);
  }

  @Delete(':contentId/attachments/:attachmentId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove attachment from content' })
  @UseGuards(ContentOwnerGuard)
  async deleteAttachment(
    @Param('attachmentId') attachmentId: string,
    @Param('contentId') contentId: string,
  ): Promise<DeleteResult> {
    return this.contentAttachmentsService.deleteAttachment({ contentId, attachmentId });
  }

  @Override('deleteOneBase')
  @Delete(':contentId')
  @ApiBearerAuth()
  @UseGuards(ContentOwnerGuard)
  async deleteContent(@Param('contentId') contentId: string): Promise<DeleteResult> {
    return this.service.deleteContent(contentId);
  }
}
