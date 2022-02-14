import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators';
import { AuthSignInDto, AuthSignUpDto, AuthResponseDto } from './dto/auth.dto';
import { AuthService } from './services/auth.service';

@ApiTags('[v1] Auth')
@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in')
  @Public()
  @ApiResponse({ type: AuthResponseDto })
  @ApiBody({ type: AuthSignInDto })
  signIn(@Body() authSignInDto: AuthSignInDto): Promise<AuthResponseDto> {
    return this.authService.signIn(authSignInDto);
  }

  @Post('/sign-up')
  @Public()
  @ApiResponse({ type: AuthResponseDto })
  @ApiBody({ type: AuthSignUpDto })
  signUp(@Body() authSignUpDto: AuthSignUpDto): Promise<AuthResponseDto> {
    return this.authService.signUp(authSignUpDto);
  }
}
