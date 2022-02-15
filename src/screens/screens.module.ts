import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScreensRepository } from './repositories';
import { ScreensController } from './v1/screens.controller';
import { ScreensService } from './v1/services';

@Module({
  imports: [TypeOrmModule.forFeature([ScreensRepository])],
  controllers: [ScreensController],
  providers: [ScreensService],
})
export class ScreensModule {}
