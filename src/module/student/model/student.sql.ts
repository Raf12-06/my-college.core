import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Student} from "./student.model";

@Injectable()
export class StudentSql {

    constructor(
        @InjectModel(Student)
        private studentRepository: typeof Student
    ) {}

    public async insert(data: Partial<Student>): Promise<Student> {
        return await this.studentRepository.create(data);
    }
}
