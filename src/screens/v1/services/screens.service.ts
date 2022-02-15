import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Screen } from 'src/screens/entities';
import { ScreensRepository } from 'src/screens/repositories';

@Injectable()
export class ScreensService extends TypeOrmCrudService<Screen> {
  constructor(
    @InjectRepository(ScreensRepository)
    public readonly screensRepository: ScreensRepository,
  ) {
    super(screensRepository);
  }
}
