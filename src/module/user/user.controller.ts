import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {AddRoleDto} from "./dto/add-role.dto";
import {RolesGuard} from "../auth/roles.guard";
import {Roles} from "../../decorator/roles-auth.decorator";
import {UpdatePersonalDto} from "./dto/update-personal.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {CurUser} from "../../decorator/user-auth.decorator";
import { FastifyRequest } from 'fastify';

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post('/avatar')
    uploadAvatar(
        @CurUser() user,
        @Req() req: FastifyRequest
    ) {
        return this.userService.uploadAvatar(user.id, req);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/personal')
    getPersonal(@CurUser() user) {
        return this.userService.getPersonal(user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/personal')
    updatePersonal(@CurUser() user, @Body() dto: UpdatePersonalDto) {
        const userId = user.id;
        return this.userService.updatePersonal(userId, dto);
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.userService.addRole(dto);
    }
}
