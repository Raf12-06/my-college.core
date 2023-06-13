import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Group} from "./model/group.model";
import {GroupSql} from "./model/group.sql";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [GroupController],
  providers: [
      GroupService,
      GroupSql,
  ],
  imports: [
      SequelizeModule.forFeature([
          Group
      ]),
      AuthModule,
  ]
})
export class GroupModule {}
