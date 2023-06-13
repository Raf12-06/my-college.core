import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {GroupService} from "./group.service";
import {CreateGroupDto} from "./dto/create-group.dto";
import {Group} from "./model/group.model";
import {Roles} from "../../system/decorator/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";

@Controller('group')
export class GroupController {

    constructor(
        private groupService: GroupService,
    ) {}

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/create')
    public async createGroup(@Body() data: CreateGroupDto): Promise<Group> {
        return await this.groupService.create(data);
    }
}
