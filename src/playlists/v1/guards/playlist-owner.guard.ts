import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaylistsRepository } from 'src/playlists/repositories';

@Injectable()
export class PlaylistOwnerGuard implements CanActivate {
  constructor(
    @InjectRepository(PlaylistsRepository)
    private readonly playlistsRepository: PlaylistsRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const isOwner = await this.playlistsRepository.isPlaylistOwner({
      playlistId: request.params.playlistId,
      userId: request.user.id,
    });

    if (!isOwner) {
      throw new ForbiddenException();
    }

    return isOwner;
  }
}
