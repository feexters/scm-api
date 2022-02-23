import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { isArray } from 'class-validator';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlaylistModel } from 'src/playlists/models';

@Injectable()
export class PlaylistModelInterceptor implements NestInterceptor<PlaylistModel, PlaylistModel> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<PlaylistModel> {
    return next.handle().pipe(
      map((data) => {
        if (isArray(data)) {
          return data.map((event) => PlaylistModel.create(event));
        }

        return PlaylistModel.create(data);
      }),
    );
  }
}
