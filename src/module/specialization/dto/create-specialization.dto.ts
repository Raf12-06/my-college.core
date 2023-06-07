import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateSpecializationDto {

    @IsString({ message: 'необходим формат хх.хх.хх' })
    readonly num: string;          // Номер специальности

    @IsString()
    readonly name: string;         // Название

    @IsNumber()
    readonly period_year: number;  // Срок обучения лет

    @IsNumber()
    readonly period_month: number; // Срок обучения мес

    @IsBoolean()
    readonly budget: boolean;      // Бюджет

    @IsNumber()
    readonly num_place: number;
}
