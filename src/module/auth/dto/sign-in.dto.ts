import {IsOptional, IsString} from "class-validator";

export class SignInDto {

    @IsString()
    readonly username: string;

    @IsString({ message: 'Некорректный пароль' })
    readonly password: string;
}
