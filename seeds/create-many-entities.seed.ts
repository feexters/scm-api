import { Content } from 'src/content/entities';
import { Event } from 'src/events/entities';
import { Screen } from 'src/screens/entities';
import { User } from 'src/users/entities';
import { Factory, Seeder } from 'typeorm-seeding';
import { getHashedPassword } from '../src/common/utils/get-hashed-password';
import { takeRandom } from '../src/common/utils/take-random';
import { Playlist } from '../src/playlists/entities/playlist.entity';
import { ContentMediaType } from '../src/content/content.types';
import { PlaylistContent } from '../src/playlist-content/entities/playlist-content.entity';
import { POSITION_STEP } from 'src/playlist-content/constants';

export default class CreateManyEntities implements Seeder {
  public async run(factory: Factory): Promise<any> {
    const users = await Promise.all(
      new Array(10).fill(undefined).map((_, index) =>
        factory(User)().create({
          username: 'username' + index,
          password: getHashedPassword('12345' + index),
        }),
      ),
    );

    const userIds = users.map(({ id }) => id);

    const events = await Promise.all(
      new Array(15).fill(undefined).map((_, index) =>
        factory(Event)().create({
          name: 'event' + index,
          userId: takeRandom(userIds),
        }),
      ),
    );

    const screens = await Promise.all(
      new Array(15).fill(undefined).map((_, index) => {
        const event = takeRandom(events);

        return factory(Screen)().create({
          name: 'screen ' + index,
          eventId: event.id,
          userId: event.userId,
        });
      }),
    );

    const playlists = await Promise.all(
      screens.map((screen, index) => {
        return factory(Playlist)().create({
          name: 'playlist' + index,
          screenId: screen.id,
          userId: screen.userId,
        });
      }),
    );

    const content = await Promise.all(
      new Array(15).fill(undefined).map((_, index) => {
        const playlist = takeRandom(playlists);

        return factory(Content)().create({
          mediaUrl: 'https://media-link.com/cf61390c-36bc-4c0b-954b-da303258d4' + index,
          mediaType: ContentMediaType.IMAGE,
          userId: playlist.userId,
        });
      }),
    );

    const contentIds = content.map(({ id }) => id);

    await Promise.all(
      playlists.map((item) => {
        return factory(PlaylistContent)().create({
          playlistId: item.id,
          contentId: takeRandom(contentIds),
          position: POSITION_STEP,
        });
      }),
    );
  }
}
