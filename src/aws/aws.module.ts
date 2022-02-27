import { Module } from '@nestjs/common';
import { AwsController } from './v1/aws.controller';
import { AwsService, CloudFilesStorageService, S3Service } from './v1/services';

@Module({
  controllers: [AwsController],
  providers: [AwsService, CloudFilesStorageService, S3Service],
})
export class AwsModule {}
