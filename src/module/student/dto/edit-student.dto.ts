import {IsDateString, IsEnum, IsInt, IsOptional, IsString, MaxLength, Min, MinLength} from "class-validator";
import {Type} from "class-transformer";
import {Student} from "../model/student.model";
import {PersonalInfoI} from "../../../service/personal/personal.interface";
import {Personal} from "../../../service/personal/model/personal.model";
import {Fio} from "../../../service/personal/model/fio.model";
import {Contact, ContactTypeE} from "../../../service/personal/model/contact.model";

export class EditStudentDto {

    @IsInt()
    @Min(1)
    readonly student_id: number;

    @Type(() => EditStudent)
    readonly student: Student;

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

    @Type(() => EditPersonal)
    readonly personal: Personal;

    @Type(() => EditFio)
    readonly fio: Fio;

    @Type(() => EditContact)
    readonly contact: Contact[];
}

class EditPersonal {

    @IsString()
    @IsOptional()
    readonly inn: string;

    @IsString()
    @IsOptional()
    readonly passport: string;
}

class EditFio {

    @IsString()
    readonly first_name: string;

    @IsString()
    readonly second_name: string;

    @IsString()
    @IsOptional()
    readonly third_name: string;
}

class EditContact {

    @IsEnum(ContactTypeE)
    contact_type: ContactTypeE;

    @IsString()
    contact_value: string;

    @IsString()
    @IsOptional()
    contact_description: string;
}
