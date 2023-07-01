import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { map } from "rxjs";






@Injectable()
export class ExcludeProperties implements NestInterceptor {
    intercept(ctx: ExecutionContext, handler: CallHandler) {

        const req = ctx.switchToHttp().getRequest();
        const reqBody = req.body;
        const { email, id, ...modifiedBody } = reqBody;
        req.body = modifiedBody
        return handler.handle();
    }

}