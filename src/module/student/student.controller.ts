import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {StudentService} from "./student.service";
import {CreateStudentDto} from "./dto/create-student.dto";
import {Roles} from "../../system/decorator/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";

@Controller('student')
export class StudentController {

    constructor(
        private studentService: StudentService
    ) {}

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/create')
    async createStudent(@Body() data: CreateStudentDto) {
        return await this.studentService.createStudent(data);
    }
}
