import {Body, Controller, Get, Param, Post, Render, UseGuards} from '@nestjs/common';
import {StudentService} from "./student.service";
import {CreateStudentDto} from "./dto/create-student.dto";
import {Roles} from "../../system/decorator/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {StudentInfoI} from "./student.interface";
import {EditStudentDto} from "./dto/edit-student.dto";

@Controller('student')
export class StudentController {

    constructor(
        private studentService: StudentService,
    ) {}

    @Roles('USER')
    @UseGuards(RolesGuard)
    @Render('edit-student')
    @Get('/edit/:student_id')
    public async editStudentPage(@Param('student_id') idStudent): Promise<StudentInfoI> {
        return await this.studentService.getStudent(idStudent);
    }

    @Roles('USER')
    @UseGuards(RolesGuard)
    @Render('create-student')
    @Get('/create')
    public async createStudentPage(): Promise<void> {
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
        return await this.studentService.getStudent(idStudent);
    }

    @Roles('USER')
    @UseGuards(RolesGuard)
    @Post('/edit/:student_id')
    public async editStudent(
        @Body() data: EditStudentDto,
        @Param('student_id') idStudent,
    ): Promise<{ student_id: number }> {
        await this.studentService.updateStudent(idStudent, data);

        return {
            student_id: idStudent,
        }
    }
}
