import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Group} from "./group.model";

@Injectable()
export class GroupSql {

    constructor(
        @InjectModel(Group)
        private groupRepo: typeof Group
    ) {}

    public async insert(data: Partial<Group>): Promise<Group> {
        return await this.groupRepo.create(data);
    }
}
