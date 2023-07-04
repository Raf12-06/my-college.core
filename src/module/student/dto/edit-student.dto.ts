import {
    IsDateString,
    IsEnum,
    IsInt,
    IsObject,
    IsOptional,
    IsString,
    MaxLength,
    Min,
    MinLength
} from "class-validator";
import {Type} from "class-transformer";
import {Student} from "../model/student.model";
import {PersonalInfoI} from "../../../service/personal/personal.interface";
import {Personal} from "../../../service/personal/model/personal.model";
import {Fio} from "../../../service/personal/model/fio.model";
import {Contact, ContactTypeE} from "../../../service/personal/model/contact.model";

export class EditStudentDto {

    @IsOptional()
    @IsObject()
    @Type(() => EditStudent)
    readonly student: Student;

    @IsOptional()
    @IsObject()
    @Type(() => EditPersonalInfo)
    readonly personal: PersonalInfoI;
}

class EditStudent {

    @MinLength(5)
    @MaxLength(50)
    readonly order_num: string;

    @IsDateString()
    readonly order_date: string;

    @IsInt()
    @Min(1)
    readonly group_id: number;
}

class EditPersonalInfo {

    @IsOptional()
    @IsObject()
    @Type(() => EditPersonal)
    readonly personal: Personal;

    @IsOptional()
    @IsObject()
    @Type(() => EditFio)
    readonly fio: Fio;

    @IsOptional()
    @IsObject()
    @Type(() => EditContact)
    readonly contact: Contact[];
}

class EditPersonal {

    @IsString()
    readonly inn: string;

    @IsString()
    readonly passport: string;
}

class EditFio {

    @IsString()
    readonly first_name: string;

    @IsString()
    readonly second_name: string;

    @IsString()
    readonly third_name: string;
}

class EditContact {

    @IsInt()
    @Min(1)
    id: number;

    @IsEnum(ContactTypeE)
    contact_type: ContactTypeE;

    @IsString()
    contact_value: string;

    @IsString()
    contact_description: string;
}
