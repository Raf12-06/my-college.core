import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader) {
                throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
            }

            req.user = this.jwtService.verify(authHeader);

        } catch (e) {
            console.log(e);
            throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
        }

        return true;
    }

}
