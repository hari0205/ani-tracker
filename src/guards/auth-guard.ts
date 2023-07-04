import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";











@Injectable()
export class AuthGuard implements CanActivate {

    canActivate(ctx: ExecutionContext): boolean | Promise<boolean> {

        const req = ctx.switchToHttp().getRequest();
        const token = req.header.authorization ?? undefined;

        if (!token) throw new UnauthorizedException("Unauthorized to access this service")
        return true
    }
}