import {Body, Controller, Get, Param, Post, Render, UseGuards} from '@nestjs/common';
import {StudentService} from "./student.service";
import {CreateStudentDto} from "./dto/create-student.dto";
import {Roles} from "../../system/decorator/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {StudentInfoI} from "./student.interface";

@Controller('student')
export class StudentController {

    constructor(
        private studentService: StudentService,
    ) {}

    @Roles('USER')
    @UseGuards(RolesGuard)
    @Render('create-student')
    @Get('/create')
    public async getCreateStudentPage(): Promise<void> {
        //
    }

    @Roles('USER')
    @UseGuards(RolesGuard)
    @Post('/create')
    public async createStudent(@Body() data: CreateStudentDto): Promise<{ student_id: number }> {
        return await this.studentService.createStudent(data);
    }

    @Roles('USER')
    @UseGuards(RolesGuard)
    @Render('student')
    @Get('/:student_id')
    public async getStudent(@Param('student_id') idStudent: number): Promise<StudentInfoI> {
        const studentInfo = await this.studentService.getStudent(idStudent);

        return {
            student: studentInfo.student,
            personal: studentInfo.personal,
            group: studentInfo.group,
            specialization: studentInfo.specialization,
        };
    }

    @Roles('USER')
    @UseGuards(RolesGuard)
    @Render('edit-student')
    @Get('/edit/:student_id')
    public async editStudent(@Param('student_id') idStudent): Promise<void> {
        //
    }
}
