import {IsString} from "class-validator";

export class SignInDto {

    @IsString({ message: 'Некорректный логин' })
    readonly username: string;

    @IsString({ message: 'Некорректный пароль' })
    readonly password: string;
}
