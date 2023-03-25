import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Role} from "./model/role.model";
import {User} from "../user/model/user.model";
import {UserRole} from "./model/user-role.model";
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [RoleService],
  controllers: [RoleController],
  imports: [
    SequelizeModule.forFeature([
      Role,
      User,
      UserRole
    ]),
    RoleModule,
    AuthModule,
  ],
  exports: [
      RoleService
  ]
})
export class RoleModule {}
