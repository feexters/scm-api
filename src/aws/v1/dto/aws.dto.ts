import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class SignedUrlResponseDto {
  @ApiProperty({
    example:
      'https://screen-content-manager.s3.eu-central-1.amazonaws.com/content/cf61390c-36bc-4c0b-954b-da303258d472/aad711dd-3e93-4db6-aaa9-625969ede5c5.png',
  })
  signedUrl: string;

  @ApiProperty({ example: 'content/cf61390c-36bc-4c0b-954b-da303258d472/cf61390c-36bc-4c0b-954b-da303258d472.jpg' })
  fileKey: string;
}

export class CreateSignedUrlContentRequestDto {
  @ApiProperty({ example: 'image.png' })
  @IsString()
  filename: string;

  @ApiProperty({ example: 'cf61390c-36bc-4c0b-954b-da303258d472' })
  @IsUUID()
  contentId: string;
}
