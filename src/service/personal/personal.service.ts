import {Injectable} from '@nestjs/common';
import {Identity} from "./model/identity.model";
import {InjectModel} from "@nestjs/sequelize";
import {Personal} from "./model/personal.model";
import {Fio} from "./model/fio.model";
import {PersonalCryptService} from "./personal.crypt-service";
import {PersonalSql} from "./model/sql/personal.sql";
import {FioSql} from "./model/sql/fio.sql";
import {PersonalInfoI} from "./personal.interface";

@Injectable()
export class PersonalService {

    constructor(
        @InjectModel(Identity)
        private identityRepository: typeof Identity,
        private personalCryptService: PersonalCryptService,
        private personalSQL: PersonalSql,
        private fioSQL: FioSql,
    ) {}

    private async getIdentityId(entryIdentity: number | string): Promise<number> {
        const userSecure = this.personalCryptService.encrypt(entryIdentity);
        return (await this.identityRepository.findOne({
            where: {
                user_secure: userSecure
            },
            attributes: ['id']
        }))?.id;
    }

    public async getPersonalInfo(entryIdentity: number | string): Promise<PersonalInfoI | null> {
        const idIdentity = await this.getIdentityId(entryIdentity);
        if (!idIdentity) {
            return null;
        }

        const [
            encryptPersonal,
            encryptFio
        ] = await Promise.all([
            this.personalSQL.getPersonal(idIdentity),
            this.fioSQL.getFio(idIdentity)
        ])

        const [
            decryptPersonal,
            decryptFio,
        ] = await Promise.all([
            this.personalCryptService.decryptIvData(encryptPersonal),
            this.personalCryptService.decryptData(encryptFio),
        ]);

        return {
            personal: decryptPersonal,
            fio: decryptFio,
        }
    }

    public async editPersonal(entryIdentity: number | string, data: {
        fio?: Partial<Fio>,
        personal?: Partial<Personal>
    }): Promise<void> {

        const idIdentity = await this.getIdentityId(entryIdentity);

        if (data.fio) {

            const encryptFio = this.personalCryptService.encryptData(data.fio);
            await this.fioSQL.updateFio(idIdentity, {
                first_name: encryptFio.first_name,
                second_name: encryptFio.second_name,
                third_name: encryptFio.third_name,
            });
        }

        if (data.personal) {

            const encryptPersonal = this.personalCryptService.encryptIvData(data.personal);
            await this.personalSQL.updatePersonal(idIdentity, {
                email: encryptPersonal.email,
                phone: encryptPersonal.phone,
                inn: encryptPersonal.inn,
                passport: encryptPersonal.passport,
            })
        }
    }

    public async createPersonal(entryIdentity: number | string, data?: {
        fio?: Partial<Fio>,
        personal?: Partial<Personal>
    }): Promise<number> {
        const secureHash = this.personalCryptService.encrypt(entryIdentity);
        const identity = await this.identityRepository.create({ user_secure: secureHash });

        let encryptFio = null;
        if (data?.fio) {
            encryptFio = this.personalCryptService.encryptData(data.fio);
        }

        let encryptPersonal = null;
        if (data?.personal) {
            encryptPersonal = this.personalCryptService.encryptIvData(data.personal);
        }

        await Promise.all([
            identity.$create('personal', {
                identity_id: identity.id,
                email: encryptPersonal?.email,
                phone: encryptPersonal?.phone,
                inn: encryptPersonal?.inn,
                passport: encryptPersonal?.passport,
            }),
            identity.$create('fio', {
                identity_id: identity.id,
                first_name: encryptFio?.first_name,
                second_name: encryptFio?.second_name,
                third_name: encryptFio?.third_name,
            }),
        ]);

        return identity.id;
    }
}
