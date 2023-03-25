import { Injectable } from '@nestjs/common';
import {CreateRoleDto} from "./dto/create-role.dto";
import {Role} from "./model/role.model";
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class RoleService {

    constructor(
        @InjectModel(Role) private roleRepo: typeof Role
    ) {}

    async createRole(dto: CreateRoleDto) {
        return await this.roleRepo.create(dto);
    }

    async getRoleByValue(values: string) {
        return await this.roleRepo.findOne({
            where: {
                values
            }
        })
    }
}
