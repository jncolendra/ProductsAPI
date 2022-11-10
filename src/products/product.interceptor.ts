/* eslint-disable prettier/prettier */

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ProductInterceptor<T> implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const now = Date.now();
    return next.handle().pipe(map((data) =>{
        return {
            API: `Made from NestJS v1`,
            statusCode: context.switchToHttp().getResponse().statusCode,
            ...data,
        }
    }),
    tap((data)=>console.log(`Time Elapsed : ${Date.now() - now}ms`, data))
    );
  }
}
