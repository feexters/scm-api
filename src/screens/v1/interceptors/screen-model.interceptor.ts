import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { isArray } from 'class-validator';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScreenModel } from 'src/screens/models';

@Injectable()
export class ScreenModelInterceptor implements NestInterceptor<ScreenModel, ScreenModel> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ScreenModel> {
    return next.handle().pipe(
      map((data) => {
        if (isArray(data)) {
          return data.map((screen) => ScreenModel.create(screen));
        }

        return ScreenModel.create(data);
      }),
    );
  }
}
