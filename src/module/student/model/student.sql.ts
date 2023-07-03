import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Student} from "./student.model";

@Injectable()
export class StudentSql {

    constructor(
        @InjectModel(Student)
        private studentRepo: typeof Student
    ) {}

    public async insert(data: Partial<Student>): Promise<Student> {
        return await this.studentRepo.create(data);
    }

    public async get(idStudent: number): Promise<Student> {
        return await this.studentRepo.findByPk(idStudent);
    }

    public async update(idStudent: number, data: Partial<Student>) {
        return await this.studentRepo.update(data, {
            where: {
                id: idStudent,
            }
        });
    }
}
