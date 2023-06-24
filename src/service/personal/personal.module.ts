import { Module } from '@nestjs/common';
import { PersonalService } from './personal.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Identity} from "./model/identity.model";
import {Personal} from "./model/personal.model";
import {Fio} from "./model/fio.model";
import {PersonalCryptService} from "./personal.crypt-service";
import {PersonalSql} from "./model/sql/personal.sql";
import {FioSql} from "./model/sql/fio.sql";
import {Contact} from "./model/contact.model";
import {ContactSql} from "./model/sql/contact.sql";

@Module({
  providers: [
      PersonalService,
      PersonalCryptService,
      PersonalSql,
      FioSql,
      ContactSql,
  ],
  exports: [PersonalService],
  imports: [
      SequelizeModule.forFeature([
          Identity,
          Personal,
          Fio,
          Contact,
      ])
  ]
})
export class PersonalModule {}
