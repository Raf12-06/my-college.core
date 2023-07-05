import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import {UserModule} from './module/user/user.module';
import {AuthModule} from './module/auth/auth.module';
import {User} from "./module/user/model/user.model";
import {PersonalModule} from './service/personal/personal.module';
import {Personal} from "./service/personal/model/personal.model";
import {Identity} from "./service/personal/model/identity.model";
import {RoleModule} from './module/role/role.module';
import {Role} from "./module/role/model/role.model";
import {UserRole} from "./module/role/model/user-role.model";
import {Fio} from "./service/personal/model/fio.model";
import {UploadModule} from './service/upload/upload.module';
import {StudentModule} from './module/student/student.module';
import {SpecializationModule} from './module/specialization/specialization.module';
import {GroupModule} from './module/group/group.module';
import {Contact} from "./service/personal/model/contact.model";
import {StudentController} from "./module/student/student.controller";
import { SearchModule } from './module/search/search.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: process.env.MYSQL_HOST,
            port: Number(process.env.MYSQL_PORT),
            username: process.env.MY_SQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DB,
            models: [
                User,
                Personal,
                Identity,
                Role,
                UserRole,
                Fio,
                Contact,
            ],
            autoLoadModels: true,
            synchronize: true,
        }),
        UserModule,
        AuthModule,
        PersonalModule,
        RoleModule,
        UploadModule,
        StudentModule,
        SpecializationModule,
        GroupModule,
        SearchModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply()
            .exclude()
            .forRoutes(StudentController)
    }
}

