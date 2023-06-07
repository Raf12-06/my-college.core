import {CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor} from "@nestjs/common";
import {Observable, tap} from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

    private readonly logger = new Logger(LoggingInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

        const request = context.switchToHttp().getRequest();

        const { ip, method, path: url } = request;

        this.logger.log(`
            ${method} ${url} ${ip}: ${context.getClass().name} ${context.getHandler().name}
        `);

        const now = Date.now();

        return next.handle().pipe(
            tap((res) => {
                const response = context.switchToHttp().getResponse();

                const { statusCode } = response;

                this.logger.log(`
                    ${method} ${url} ${statusCode} - ${ip}: ${Date.now() - now}ms
                `);
            })
        )
    }

}
























