import {Body, Controller, Get, Post, Render, Req, Res} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {SignUpDto} from "./dto/sign-up.dto";
import {SignInDto} from "./dto/sign-in.dto";
import {FastifyRequest, FastifyReply} from "fastify";

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}

    @Render('sign-in')
    @Get('/sign-in')
    async signInPage(): Promise<void> {
        //
    }

    @Post('/sign-up')
    async signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
        return await this.authService.signUp(signUpDto);
    }

    @Post('/sign-in')
    async signIn(
        @Body() signInDto: SignInDto,
        @Res() res: FastifyReply,
        @Req() req: FastifyRequest
    ): Promise<any> {
        const token = await this.authService.signIn(signInDto);

        res.setCookie('authorization', token, {
            httpOnly: true,
            path: '/',
        });

        res.send();
    }
}
