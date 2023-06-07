import {forwardRef, Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {UserModule} from "../user/user.module";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule} from "@nestjs/config";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
      ConfigModule.forRoot({
          envFilePath: `.${process.env.NODE_ENV}.env`
      }),
      JwtModule.register({
          secret: process.env.PRIVATE_KEY,
          signOptions: {
              expiresIn: '24h',
          }
      }),
      forwardRef(() => UserModule),
  ],
  exports: [
      AuthService,
      JwtModule,
  ]
})
export class AuthModule {}
