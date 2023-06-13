import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {SignUpDto} from "./dto/sign-up.dto";
import * as argon from 'argon2';
import {JwtService} from "@nestjs/jwt";
import {User} from "../user/model/user.model";
import * as crypto from 'crypto';
import { argon2i } from "argon2";
import {SignInDto} from "./dto/sign-in.dto";

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    private generateToken(user: User): string {
        const payload = {
            id: user.id,
            username: user.username,
            roles: user.roles,
        }
        return this.jwtService.sign(payload);
    }

    async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
        const { username, password } = signUpDto;

        const candidate = await this.userService.getUserByUsername(username);
        if (candidate) {
            throw new HttpException('Пользователь уже зарегистрирован', HttpStatus.BAD_REQUEST);
        }

        const salt = crypto.randomBytes(16);
        const hashPassword = await argon.hash(password, {
            type: argon2i,
            timeCost: 3,
            memoryCost: 262144,
            salt
        });

        const user = await this.userService.createUser({
            username,
            password: hashPassword,
        });

        const token = this.generateToken(user);

        return {
            token,
        }
    }

    async signIn(signInDto: SignInDto): Promise<{ token: string }> {
        const user = await this.userService.getUserByUsername(signInDto.username);
        if (!user) {
            throw new UnauthorizedException({ message: 'Введены неверные данные' });
        }
        const isPasswordTrue = await argon.verify(user?.password, signInDto.password);
        if (!isPasswordTrue) {
            throw new UnauthorizedException({ message: 'Введены неверные данные' });
        }

        const token = this.generateToken(user);

        return {
            token,
        }
    }
}
