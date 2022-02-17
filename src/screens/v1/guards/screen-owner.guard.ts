import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScreensRepository } from 'src/screens/repositories';

@Injectable()
export class ScreenOwnerGuard implements CanActivate {
  constructor(
    @InjectRepository(ScreensRepository)
    private readonly screensRepository: ScreensRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const isOwner = await this.screensRepository.isScreenOwner({
      screenId: request.params.screenId,
      userId: request.user.id,
    });

    if (!isOwner) {
      throw new ForbiddenException();
    }

    return isOwner;
  }
}
