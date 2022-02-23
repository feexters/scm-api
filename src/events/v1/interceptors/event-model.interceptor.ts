import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { isArray } from 'class-validator';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventModel } from 'src/events/models';

@Injectable()
export class EventModelInterceptor implements NestInterceptor<EventModel, EventModel> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<EventModel> {
    return next.handle().pipe(
      map((data) => {
        if (isArray(data)) {
          return data.map((screen) => EventModel.create(screen));
        }

        return EventModel.create(data);
      }),
    );
  }
}
