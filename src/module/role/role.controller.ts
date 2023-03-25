import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {RoleService} from "./role.service";
import {Role} from "./model/role.model";
import {CreateRoleDto} from "./dto/create-role.dto";
import {Roles} from "../../decorator/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('role')
export class RoleController {
    constructor(
        private roleService: RoleService
    ) {}

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() dto: CreateRoleDto): Promise<Role> {
        return this.roleService.createRole(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:values')
    getByValue(@Param('values') values: string): Promise<Role> {
        return this.roleService.getRoleByValue(values);
    }
}
