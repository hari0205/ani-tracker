import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { ClassConstructor, plainToInstance } from "class-transformer";















@Injectable()
export class UserInterceptor<T> implements NestInterceptor {
    constructor(private dto: ClassConstructor<T>) { }
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        return next.handle().pipe(map(data => plainToInstance(this.dto, data, { excludeExtraneousValues: true })));
    }
}