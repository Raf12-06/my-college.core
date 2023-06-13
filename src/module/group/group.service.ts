import { Injectable } from '@nestjs/common';
import {CreateGroupDto} from "./dto/create-group.dto";
import {Group} from "./model/group.model";
import {GroupSql} from "./model/group.sql";

@Injectable()
export class GroupService {

    constructor(
        private groupSQL: GroupSql,
    ) {}

    async create(data: CreateGroupDto): Promise<Group> {
        return await this.groupSQL.insert(data);
    }
}
