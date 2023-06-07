import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Fio} from "../fio.model";

@Injectable()
export class FioSql {

    constructor(
        @InjectModel(Fio)
        private fioRepo: typeof Fio,
    ) {}

    async updateFio(identityId: number, data: Partial<Fio>) {
        return await this.fioRepo.update(data, {
            where: {
                identity_id: identityId,
            }
        });
    }

    async getFio(identityId: number): Promise<Fio> {
        return await this.fioRepo.findOne({
            where: {
                identity_id: identityId,
            },
            raw: true,
        });
    }
}
