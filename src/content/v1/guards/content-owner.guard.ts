import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentRepository } from 'src/content/repositories';

@Injectable()
export class ContentOwnerGuard implements CanActivate {
  constructor(
    @InjectRepository(ContentRepository)
    private readonly contentRepository: ContentRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const isOwner = await this.contentRepository.isContentOwner({
      contentId: request.params.id,
      userId: request.user.id,
    });

    if (!isOwner) {
      throw new ForbiddenException();
    }

    return isOwner;
  }
}
