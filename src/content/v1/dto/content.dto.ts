import { PickType } from '@nestjs/swagger';
import { ContentModel } from 'src/content/models';

export class CreateContentDto extends PickType(ContentModel, ['mediaUrl', 'mediaType']) {}
