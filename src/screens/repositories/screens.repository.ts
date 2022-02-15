import { EntityRepository, Repository } from 'typeorm';
import { Screen } from '../entities';

@EntityRepository(Screen)
export class ScreensRepository extends Repository<Screen> {
  async isScreenOwner({
    screenId,
    userId,
  }: {
    screenId: string;
    userId: string;
  }): Promise<boolean> {
    const screen = await this.findOne({ id: screenId, userId });

    if (!screen) {
      return false;
    }

    return true;
  }
}
