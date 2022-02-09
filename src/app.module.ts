import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration.configuration],
      validationSchema: configuration.validationSchema,
      validationOptions: configuration.validationOptions,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
