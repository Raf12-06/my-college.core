import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as crypto from "crypto";
import {CreateStudentDto} from "./dto/create-student.dto";
import {StudentSql} from "./model/student.sql";
import {PersonalService} from "../../service/personal/personal.service";
import {StudentI, StudentInfoI} from "./student.interface";
import {Student} from "./model/student.model";

@Injectable()
export class StudentService {

    constructor(
        private studentSQL: StudentSql,
        private personalService: PersonalService,
    ) {}

    public async get(idStudent: number): Promise<Student> {
        const student = await this.studentSQL.get(idStudent);
        if (!student) {
            throw new HttpException('студен не найден', HttpStatus.BAD_REQUEST);
        }

        return student;
    }

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
                inn: data.inn,
                passport: data.passport,
            },
            fio: {
                first_name: data.first_name,
                second_name: data.second_name,
                third_name: data.third_name,
            },
            contact: data.list_contact,
        });

        return {
            student_id: student.id
        }
    }

    public async getStudent(idStudent: number): Promise<StudentInfoI> {
        const student = await this.get(idStudent);

        const group = await student.$get('group');
        const specialization = await group.$get('specialization');

        const personal = await this.personalService.getPersonalInfo(student.secure_key);

        return {
            student: student.dataValues,
            group: group.dataValues,
            specialization: specialization.dataValues,
            personal,
        };
    }

    public async updateStudent(idStudent: number, data: Partial<StudentI>): Promise<any> {
        const student = await this.get(idStudent);

        if (data.student) {
            await this.studentSQL.update(student.id, data.student);
        }

        if (data.personal) {
            await this.personalService.editPersonal(student.secure_key, data.personal);
        }
    }
}
