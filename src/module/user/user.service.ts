import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User, UserCreatAttrs} from "./model/user.model";
import {AddRoleDto} from "./dto/add-role.dto";
import {RoleService} from "../role/role.service";
import {UpdatePersonalDto} from "./dto/update-personal.dto";
import {PersonalService} from "../../service/personal/personal.service";

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User)
        private userRepository: typeof User,
        private roleService: RoleService,
        private personalService: PersonalService,
    ) {}

    /** Добавить пользователя */
    async createUser(data: UserCreatAttrs): Promise<User> {
        const user = await this.userRepository.create(data);
        const role = await this.roleService.getRoleByValue('USER');

        const identity = await this.personalService.createIdentity(user.id);

        await Promise.all([
            user.$set('roles', [role.id]),
            identity.$create('personal', { identityId: identity.id }),
            identity.$create('fio', { identityId: identity.id }),
        ]);

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

        await this.personalService.updateUserPersonalInfo(userId, dto);

        return dto;
    }

    /** Получить персональные данные */
    async getPersonal(userId: number) {
        return await this.personalService.getUserPersonalInfo(userId);
    }

    /** Получить пользователя по нику */
    async getUserByUsername(username: string): Promise<User> {
        return await this.userRepository.findOne({
            where: {
                username,
            }
        })
    }
}
