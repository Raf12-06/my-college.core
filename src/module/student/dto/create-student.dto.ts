import {
    IsDateString,
    IsEmail, IsEnum,
    IsInt,
    IsOptional,
    IsPhoneNumber,
    IsString,
    MaxLength,
    Min,
    MinLength
} from "class-validator";
import {Contact, ContactTypeE} from "../../../service/personal/model/contact.model";
import {Type} from "class-transformer";

export class CreateStudentDto {

    @MinLength(5)
    @MaxLength(50)
    readonly order_num: string;

    @IsDateString()
    readonly order_date: string;

    @IsInt()
    @Min(1)
    readonly group_id: number;

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

    @IsOptional()
    @Type(() => ContactList)
    readonly list_contact: Contact[];
}

class ContactList {

    @IsEnum(ContactTypeE)
    contact_type: ContactTypeE;

    @IsString()
    contact_value: string;

    @IsString()
    @IsOptional()
    contact_description: string;
}
