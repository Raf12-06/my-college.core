import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User, UserCreatAttrs} from "./model/user.model";
import {AddRoleDto} from "./dto/add-role.dto";
import {RoleService} from "../role/role.service";
import {UpdatePersonalDto} from "./dto/update-personal.dto";
import {PersonalService} from "../../service/personal/personal.service";
import {UploadService} from "../../service/upload/upload.service";
import fastify = require('fastify');

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User)
        private userRepository: typeof User,
        private roleService: RoleService,
        private personalService: PersonalService,
        private uploadService: UploadService,
    ) {}

    /** Добавить пользователя */
    async createUser(data: UserCreatAttrs): Promise<User> {
        const user = await this.userRepository.create(data);
        const role = await this.roleService.getRoleByValue('USER');
        await user.$set('roles', [role.id])
        user.roles = [role];

        await this.personalService.createPersonal(user.id);

        return user;
    }

    /** Добавить роль */
    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && user) {
            await user.$add('role', role.id);
            return dto;
        }
        throw new HttpException('Пользователь или роль не найдена', HttpStatus.NOT_FOUND);
    }

    /** Обновить персональные данные */
    async updatePersonal(userId: number, dto: UpdatePersonalDto) {
        const dtoEntry = Object.entries(dto);
        if (!dtoEntry.length) {
            throw new HttpException('Пустое тело запроса', HttpStatus.BAD_REQUEST);
        }

        await this.personalService.editPersonal(userId, dto);

        return dto;
    }

    /** Получить персональные данные */
    async getPersonal(userId: number) {
        return await this.personalService.getPersonalInfo(userId);
    }

    /** Загрузить аватарку пользоателя */
    async uploadAvatar(userId: number, req: fastify.FastifyRequest) {
        return await this.uploadService.uploadFile(req);
    }

    /** Получить пользователя по нику */
    async getUserByUsername(username: string): Promise<User> {
        return await this.userRepository.findOne({
            where: {
                username,
            },
            include: { all: true }
        });
    }
}
