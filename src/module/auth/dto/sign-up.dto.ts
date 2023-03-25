import { IsString, MinLength } from "class-validator";

export class SignUpDto {

    @IsString()
    readonly username: string;

    @IsString({ message: 'Некорректный пароль' })
    @MinLength(8, { message: 'Минимальная длина 8 символов' })
    readonly password: string;
}
