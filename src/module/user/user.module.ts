import {forwardRef, Module} from '@nestjs/common';
import { UserService } from './user.service';
import {SequelizeModule} from "@nestjs/sequelize";
import { User } from "./model/user.model";
import { UserController } from './user.controller';
import {RoleModule} from "../role/role.module";
import {AuthModule} from "../auth/auth.module";
import {PersonalModule} from "../../service/personal/personal.module";

@Module({
  providers: [UserService],
  imports: [
      SequelizeModule.forFeature([
          User
      ]),
      RoleModule,
      forwardRef(() => AuthModule),
      PersonalModule,
  ],
  exports: [
      UserService,
  ],
  controllers: [UserController]
})
export class UserModule {}
