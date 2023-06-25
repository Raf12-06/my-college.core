import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Student} from "./model/student.model";
import {StudentService} from "./student.service";
import {StudentSql} from "./model/student.sql";
import {PersonalModule} from "../../service/personal/personal.module";
import {AuthModule} from "../auth/auth.module";
import {Contact} from "../../service/personal/model/contact.model";

@Module({
  controllers: [StudentController],
  providers: [
      StudentService,
      StudentSql,
  ],
  imports: [
      SequelizeModule.forFeature([
          Student,
          Contact,
      ]),
      PersonalModule,
      AuthModule
  ]
})
export class StudentModule {}
