import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Personal} from "../personal.model";

@Injectable()
export class PersonalSql {

    constructor(
        @InjectModel(Personal)
        private personalRepo: typeof Personal,
    ) {}

    async updatePersonal(identityId: number, data: Partial<Personal>) {
        return await this.personalRepo.update(data, {
            where: {
                identity_id: identityId,
            }
        });
    }

    async getPersonal(identityId: number): Promise<Partial<Personal>> {
        return await this.personalRepo.findOne({
            where: {
                identity_id: identityId,
            },
            attributes: ['email', 'phone', 'inn', 'passport'],
            raw: true,
        });
    }
}
