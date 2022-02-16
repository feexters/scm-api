import { EntityRepository, Repository } from 'typeorm';
import { PlaylistContent } from '../entities/playlist-content.entity';

@EntityRepository(PlaylistContent)
export class PlaylistContentRepository extends Repository<PlaylistContent> {}
