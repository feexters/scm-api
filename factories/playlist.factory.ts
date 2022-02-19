import { Playlist } from 'src/playlists/entities';
import { define } from 'typeorm-seeding';

define(Playlist, () => new Playlist());
