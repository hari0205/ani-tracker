import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map, tap } from "rxjs";
import { ClassConstructor, plainToClass, plainToInstance } from "class-transformer";
import { ReponseUser, ResponseDto } from "../dtos/response-user.dto";
import { User } from "../user.entity";















@Injectable()
export class UserInterceptor<T> implements NestInterceptor {
    constructor(private dto: ClassConstructor<T>) { }
    intercept(context: ExecutionContext, next: CallHandler): Observable<T> {

        return next.handle().pipe(
            map((data) => {

                const transformedUsers = data.users.map((user: User) => plainToInstance(ReponseUser, user));
                data.users = transformedUsers;
                const responseDto = plainToClass(this.dto, data, { excludeExtraneousValues: true });
                return responseDto;
            })
        )
    }
}