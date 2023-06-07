import {
    IsDateString,
    IsEmail,
    IsInt,
    IsOptional,
    IsPhoneNumber,
    IsString,
    MaxLength,
    Min,
    MinLength
} from "class-validator";

export class CreateStudentDto {

    @MinLength(5)
    @MaxLength(50)
    readonly order_num: string;

    @IsDateString()
    readonly order_date: string;

    @IsInt()
    @Min(1)
    readonly group_id: number;

    @IsEmail()
    @IsOptional()
    readonly email: string;

    @IsPhoneNumber()
    @IsOptional()
    readonly phone: string;

    @IsString()
    @IsOptional()
    readonly inn: string;

    @IsString()
    @IsOptional()
    readonly passport: string;

    @IsString()
    readonly first_name: string;

    @IsString()
    readonly second_name: string;

    @IsString()
    @IsOptional()
    readonly third_name: string;
}
