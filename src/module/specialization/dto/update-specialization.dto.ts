import {IsBoolean, IsNumber, IsOptional, IsString} from "class-validator";

export class UpdateSpecializationDto {

    @IsOptional()
    @IsString({ message: 'необходим формат хх.хх.хх' })
    readonly num: string;          // Номер специальности

    @IsOptional()
    @IsString()
    readonly name: string;         // Название

    @IsOptional()
    @IsNumber()
    readonly period_year: number;  // Срок обучения лет

    @IsOptional()
    @IsNumber()
    readonly period_month: number; // Срок обучения мес

    @IsOptional()
    @IsBoolean()
    readonly budget: boolean;      // Бюджет

    @IsOptional()
    @IsBoolean()
    readonly is_active: boolean;
}
