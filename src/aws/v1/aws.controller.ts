import { SignedUrlResponseDto, CreateSignedUrlContentRequestDto } from './dto';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AwsService } from './services/aws.service';

@ApiTags('[v1] AWS')
@Controller('v1/aws')
export class AwsController {
  constructor(private readonly awsService: AwsService) {}

  @Post('signed-url-content')
  @ApiOkResponse({ type: SignedUrlResponseDto })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create content signed url' })
  createContentSignedUrl(@Body() dto: CreateSignedUrlContentRequestDto): Promise<SignedUrlResponseDto> {
    return this.awsService.createSignedUrlForContent(dto);
  }
}
