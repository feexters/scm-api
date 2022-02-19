import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsOptional, IsUUID } from 'class-validator';

export class AddContentToPlaylistRequestDto {
  @ApiProperty({ example: 'cf61390c-36bc-4c0b-954b-da303258d472' })
  @IsUUID()
  contentId: string;

  @ApiProperty({ example: 'cf61390c-36bc-4c0b-954b-da303258d472' })
  @IsOptional()
  @IsUUID()
  beforeContentId?: string;
}

export class AddContentToPlaylistResponseDto {
  @ApiProperty({ example: true })
  success: boolean;
}
