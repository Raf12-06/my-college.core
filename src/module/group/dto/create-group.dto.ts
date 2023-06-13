import {IsNumber, IsOptional, IsString} from "class-validator";

export class CreateGroupDto {

    @IsString()
    readonly group_name: string;

    @IsNumber()
    readonly group_year: number;

    @IsNumber()
    readonly group_num: number;

    @IsString()
    readonly group_postfix: string;

    @IsOptional()
    readonly specialization_id: number;
}
