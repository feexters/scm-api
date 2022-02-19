import { EntityRepository, Repository } from 'typeorm';
import { Content } from '../entities';

@EntityRepository(Content)
export class ContentRepository extends Repository<Content> {
  async isContentOwner({ contentId, userId }: { contentId: string; userId: string }): Promise<boolean> {
    const content = await this.findOne({ id: contentId, userId });

    if (!content) {
      return false;
    }

    return true;
  }
}
