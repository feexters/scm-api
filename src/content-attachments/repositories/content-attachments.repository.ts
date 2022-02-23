import { EntityRepository, Repository } from 'typeorm';
import { ContentAttachment } from '../entities';

@EntityRepository(ContentAttachment)
export class ContentAttachmentsRepository extends Repository<ContentAttachment> {}
