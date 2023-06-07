import { Injectable } from '@nestjs/common';
import * as crypto from "crypto";
import {CreateStudentDto} from "./dto/create-student.dto";
import {StudentSql} from "./model/student.sql";
import {PersonalService} from "../../service/personal/personal.service";

@Injectable()
export class StudentService {

    constructor(
        private studentSQL: StudentSql,
        private personalService: PersonalService,
    ) {}

    async createStudent(data: CreateStudentDto): Promise<{ student_id: number }> {
        const student = await this.studentSQL.insert({
            order_date: data.order_date,
            order_num: data.order_num,
            group_id: data.group_id,
            secure_key: crypto.randomUUID(),
        });

        await this.personalService.createPersonal(student.id, {
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
}
