import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Screen } from 'src/screens/entities';
import { ScreensRepository } from 'src/screens/repositories';
import { CreateScreenDto } from '../dto';

@Injectable()
export class ScreensService extends TypeOrmCrudService<Screen> {
  constructor(
    @InjectRepository(ScreensRepository)
    public readonly screensRepository: ScreensRepository,
  ) {
    super(screensRepository);
  }

  async createScreen(
    createScreenDto: CreateScreenDto,
    { eventId, userId }: { eventId: string; userId: string },
  ): Promise<Screen> {
    const commentCreated = this.screensRepository.create({
      eventId,
      userId,
      ...createScreenDto,
    });

    return this.screensRepository.save(commentCreated);
  }
}
