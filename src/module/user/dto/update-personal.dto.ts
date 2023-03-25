import {
    IsEmail,
    IsMobilePhone,
    IsNumberString,
    IsOptional, IsString,
    Length, ValidateNested,
} from "class-validator";
import {Type} from "class-transformer";

class PersonalDto {
    @IsOptional()
    @IsEmail()
    readonly email: string;

    @IsOptional()
    @IsMobilePhone()
    readonly phone: string;

    @IsOptional()
    @IsNumberString()
    @Length(12)
    readonly inn: string;

    @IsOptional()
    @IsNumberString()
    @Length(10)
    readonly passport: string;
}

class FioDto {
    @IsOptional()
    @IsString()
    readonly first_name: string;

    @IsOptional()
    @IsString()
    readonly second_name: string;

    @IsOptional()
    @IsString()
    readonly third_name: string;
}

export class UpdatePersonalDto {

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => PersonalDto)
    personal: PersonalDto;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => FioDto)
    fio: FioDto
}
