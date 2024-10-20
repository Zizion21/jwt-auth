import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "../auth.service";
import { AuthMessages } from "src/common/enums/messages.enum";
import { isJWT } from "class-validator";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService
    ) { }
    async canActivate(context: ExecutionContext) {

        const req: Request = context.switchToHttp().getRequest<Request>();
        const token = this.extractToken(req);

        req.user = await this.authService.validateAccessToken(token);
        return true;
    }

    protected extractToken(req: Request) {
        const { authorization } = req.headers;

        if (!authorization || authorization.trim() == "")
            throw new UnauthorizedException(AuthMessages.LogInFirst);

        const [bearer, token] = authorization?.split(" ");
        if (
            bearer?.toLowerCase() !== "bearer"
            || !token
            || !isJWT(token)
        ) throw new UnauthorizedException(AuthMessages.LogInFirst);

        return token;
    }
}