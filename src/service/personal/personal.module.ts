import { Module } from '@nestjs/common';
import { PersonalService } from './personal.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Identity} from "./model/identity.model";
import {Personal} from "./model/personal.model";
import {Fio} from "./model/fio.model";

@Module({
  providers: [PersonalService],
  exports: [PersonalService],
  imports: [
      SequelizeModule.forFeature([
          Identity,
          Personal,
          Fio,
      ])
  ]
})
export class PersonalModule {}
