import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DeleteObjectOutput, HeadObjectOutput, ObjectKey } from 'aws-sdk/clients/s3';

import { S3Service } from './s3.service';

type fileActions = 'putObject' | 'getObject';

@Injectable()
export class CloudFilesStorageService {
  constructor(private readonly s3Service: S3Service, private readonly configService: ConfigService) {}

  private _getBucketName(): string {
    return this.configService.get<string>('s3.publicBucket');
  }

  async getSignedUrl(
    bucket: 'private' | 'public',
    action: fileActions,
    input: {
      fileKey: string;
      contentType?: string;
    },
  ): Promise<string> {
    const writeParams = {
      Bucket: this._getBucketName(),
      Expires:
        action === 'putObject'
          ? this.configService.get<string>('s3.putActionExpiresSec')
          : this.configService.get<string>('s3.getActionExpiresSec'),
      Key: input.fileKey,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    if (action === 'putObject' && input.contentType) {
      writeParams.ContentType = input.contentType;
    }

    return new Promise((resolve, reject) => {
      this.s3Service.client.getSignedUrl(action, writeParams, (err, url) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(url);
      });
    });
  }

  async headObject(filekey: ObjectKey): Promise<HeadObjectOutput> {
    return new Promise((resolve, reject) => {
      this.s3Service.client.headObject(
        {
          Bucket: this._getBucketName() || '',
          Key: filekey,
        },
        (err, res) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(res);
        },
      );
    });
  }

  async deleteObject(filekey: ObjectKey): Promise<DeleteObjectOutput> {
    const bucketName = this._getBucketName();
    if (!bucketName) {
      throw new Error('_getBucketName: get bucketName error');
    }
    return new Promise((resolve, reject) => {
      this.s3Service.client.deleteObject(
        {
          Bucket: bucketName,
          Key: filekey,
        },
        (err, res) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(res);
        },
      );
    });
  }
}
