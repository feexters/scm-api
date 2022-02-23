import { PickType } from '@nestjs/swagger';
import { ContentAttachmentModel } from 'src/content-attachments/models';

export class CreateContentAttachmentDto extends PickType(ContentAttachmentModel, [
  'orientation',
  'height',
  'width',
  'source',
]) {}
