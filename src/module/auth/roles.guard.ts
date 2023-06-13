import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "../../system/decorator/roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(
        private jwtService: JwtService,
        private reflector: Reflector
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        let user = null;
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
        try {

            if (!requiredRoles) {
                return true;
            }

            const authHeader = req.headers?.authorization;

            if (!authHeader) {
                new Error();
            }

            user = this.jwtService.verify(authHeader);
        } catch (e) {
            throw new UnauthorizedException({message: 'Пользователь не авторизован'});
        }

        try {
            req.user = user;
            return user.roles.some(role => requiredRoles.includes(role.values));
        } catch (e) {
            throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
        }
    }

}
