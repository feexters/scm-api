import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScreensRepository } from 'src/screens/repositories';
import { ScreensService } from 'src/screens/v1/services';
import { EventsRepository } from './repositories';
import { EventsController } from './v1/events.controller';
import { EventsService } from './v1/services/events.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventsRepository, ScreensRepository])],
  controllers: [EventsController],
  providers: [EventsService, ScreensService],
})
export class EventsModule {}
