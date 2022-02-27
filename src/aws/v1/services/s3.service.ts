import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import S3 from 'aws-sdk/clients/s3';

@Injectable()
export class S3Service {
  private _client: S3;
  constructor(private readonly configService: ConfigService) {
    this._client = this.createS3FromOptions();
  }

  private createS3FromOptions(): S3 {
    return new S3({
      signatureVersion: 'v4',
      region: this.configService.get<string>('s3.region'),
      credentials: {
        accessKeyId: this.configService.get<string>('aws.accessKey'),
        secretAccessKey: this.configService.get<string>('aws.secretAccessKey'),
      },
    });
  }

  get client(): S3 {
    return this._client;
  }
}
