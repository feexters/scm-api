import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsRepository } from './repositories';
import { EventsController } from './v1/events.controller';
import { EventsService } from './v1/services/events.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventsRepository])],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
