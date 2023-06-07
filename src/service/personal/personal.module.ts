import { Module } from '@nestjs/common';
import { PersonalService } from './personal.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Identity} from "./model/identity.model";
import {Personal} from "./model/personal.model";
import {Fio} from "./model/fio.model";
import {PersonalCryptService} from "./personal.crypt-service";
import {PersonalSql} from "./model/sql/personal.sql";
import {FioSql} from "./model/sql/fio.sql";

@Module({
  providers: [
      PersonalService,
      PersonalCryptService,
      PersonalSql,
      FioSql,
  ],
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
