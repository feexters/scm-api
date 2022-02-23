import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from 'src/users/models';

@Injectable()
export class UserModelInterceptor implements NestInterceptor<UserModel, UserModel> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<UserModel> {
    return next.handle().pipe(map((data) => UserModel.create(data)));
  }
}
