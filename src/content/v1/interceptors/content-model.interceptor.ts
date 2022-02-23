import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { isArray } from 'class-validator';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContentModel } from 'src/content/models';

@Injectable()
export class ContentModelInterceptor implements NestInterceptor<ContentModel, ContentModel> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ContentModel> {
    return next.handle().pipe(
      map((data) => {
        if (isArray(data)) {
          return data.map((content) => ContentModel.create(content));
        }

        return ContentModel.create(data);
      }),
    );
  }
}
