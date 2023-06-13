import { Injectable } from '@nestjs/common';
import * as crypto from "crypto";
import {CreateStudentDto} from "./dto/create-student.dto";
import {StudentSql} from "./model/student.sql";
import {PersonalService} from "../../service/personal/personal.service";
import {Student} from "./model/student.model";
import {Group} from "../group/model/group.model";
import {Specialization} from "../specialization/model/specialization.model";
import {PersonalInfoI} from "../../service/personal/personal.interface";

@Injectable()
export class StudentService {

    constructor(
        private studentSQL: StudentSql,
        private personalService: PersonalService,
    ) {}

    public async createStudent(data: CreateStudentDto): Promise<{ student_id: number }> {

        const secureKey = crypto.randomUUID();

        const student = await this.studentSQL.insert({
            order_date: data.order_date,
            order_num: data.order_num,
            group_id: data.group_id,
            secure_key: secureKey,
        });

        await this.personalService.createPersonal(secureKey, {
            personal: {
                email: data.email,
                phone: data.phone,
                inn: data.inn,
                passport: data.passport,
            },
            fio: {
                first_name: data.first_name,
                second_name: data.second_name,
                third_name: data.third_name,
            }
        });

        return {
            student_id: student.id
        }
    }

    public async getStudent(idStudent: number): Promise<{
        student: Student,
        group: Group,
        specialization: Specialization,
        personal: PersonalInfoI,
    }> {
        const student = await this.studentSQL.get(idStudent);

        const group = await student.$get('group');
        const specialization = await group.$get('specialization');

        const personal = await this.personalService.getPersonalInfo(student.secure_key);

        return {
            student,
            group,
            specialization,
            personal,
        };
    }
}
