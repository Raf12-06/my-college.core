import {Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards} from '@nestjs/common';
import {StudentService} from "./student.service";
import {CreateStudentDto} from "./dto/create-student.dto";
import {Roles} from "../../system/decorator/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {Student} from "./model/student.model";
import {Group} from "../group/model/group.model";
import {Specialization} from "../specialization/model/specialization.model";
import {PersonalInfoI} from "../../service/personal/personal.interface";

@Controller('student')
export class StudentController {

    constructor(
        private studentService: StudentService
    ) {}

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/create')
    public async createStudent(@Body() data: CreateStudentDto): Promise<{ student_id: number }> {
        return await this.studentService.createStudent(data);
    }

    @Roles('USER')
    @UseGuards(RolesGuard)
    @Get('/:student_id')
    public async getStudent(@Param('student_id') idStudent: number): Promise<{
        student: Student,
        group: Group,
        specialization: Specialization,
        personal: PersonalInfoI,
    }> {
        return await this.studentService.getStudent(idStudent);
    }
}
