import { Module } from '@nestjs/common';
import { SpecializationController } from './specialization.controller';
import { SpecializationService } from './specialization.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Specialization} from "./model/specialization.model";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [SpecializationController],
  providers: [SpecializationService],
  imports: [
      SequelizeModule.forFeature([
          Specialization
      ]),
      AuthModule
  ]
})
export class SpecializationModule {}
