import { BadRequestException, Injectable } from '@nestjs/common';
import { getFileExtension, isContent } from 'src/common/utils';
import { v4 as uuidv4 } from 'uuid';
import { CloudFilesStorageService } from '.';
import { SignedUrlResponseDto, CreateSignedUrlContentRequestDto } from '../dto';

@Injectable()
export class AwsService {
  constructor(private readonly filesStorageService: CloudFilesStorageService) {}

  async createSignedUrlForContent({
    contentId,
    filename,
  }: CreateSignedUrlContentRequestDto): Promise<SignedUrlResponseDto> {
    const fileExt = getFileExtension(filename);

    if (!fileExt || !isContent(filename)) {
      throw new BadRequestException('invalid file extension');
    }

    const fileKey = `content/${contentId}/${uuidv4()}.${fileExt}`;

    const signedUrl = await this.filesStorageService.getSignedUrl('public', 'putObject', {
      fileKey,
    });

    return {
      signedUrl,
      fileKey,
    };
  }

  async removeFileFromS3(fileKey: string): Promise<boolean> {
    try {
      await this.filesStorageService.deleteObject(fileKey);
      return true;
    } catch (error) {
      return false;
    }
  }
}
