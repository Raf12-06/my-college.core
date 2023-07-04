import {Injectable} from '@nestjs/common';
import {Identity} from "./model/identity.model";
import {InjectModel} from "@nestjs/sequelize";
import {PersonalCryptService} from "./personal.crypt-service";
import {PersonalSql} from "./model/sql/personal.sql";
import {FioSql} from "./model/sql/fio.sql";
import {PersonalInfoI} from "./personal.interface";
import {ContactSql} from "./model/sql/contact.sql";

@Injectable()
export class PersonalService {

    constructor(
        @InjectModel(Identity)
        private identityRepository: typeof Identity,
        private personalCryptService: PersonalCryptService,
        private personalSQL: PersonalSql,
        private fioSQL: FioSql,
        private contactSQL: ContactSql,
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
            encryptFio,
            encryptContact,
        ] = await Promise.all([
            this.personalSQL.getPersonal(idIdentity),
            this.fioSQL.getFio(idIdentity),
            this.contactSQL.getContact(idIdentity),
        ]);

        const decryptPersonal = this.personalCryptService.decryptIvData(encryptPersonal);
        const decryptFio = this.personalCryptService.decryptData(encryptFio);
        const decryptContact = encryptContact.map(v => {
            return {
                ...v.dataValues,
                contact_value: this.personalCryptService.decrypt(v.contact_value),
            }
        });

        return {
            personal: decryptPersonal,
            fio: decryptFio,
            contact: decryptContact,
        }
    }

    public async editPersonal(entryIdentity: number | string, data: Partial<PersonalInfoI>): Promise<void> {

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
                inn: encryptPersonal.inn,
                passport: encryptPersonal.passport,
            });
        }

        if (data.contact?.length) {
            const encryptContact = data.contact.map(v => ({
                id: v.id,
                identity_id: idIdentity,
                contact_type: v.contact_type,
                contact_value: this.personalCryptService.encrypt(v.contact_value),
                contact_description: v.contact_description,
            }));

            const listContact = [];
            const listContactNew = [];
            encryptContact.forEach(v => {
                if (v.id) listContact.push(this.contactSQL.updateContact(v.id, v));
                else listContactNew.push({
                    identity_id: idIdentity,
                    contact_type: v.contact_type,
                    contact_value: v.contact_value,
                    contact_description: v.contact_description,
                });
            });

            if (listContact.length) await Promise.all(listContact);
            if (listContactNew.length) await this.contactSQL.insertList(listContactNew);
        }
    }

    public async createPersonal(entryIdentity: number | string, data?: Partial<PersonalInfoI>): Promise<number> {
        const secureHash = this.personalCryptService.encrypt(entryIdentity);
        const identity = await this.identityRepository.create({ user_secure: secureHash });

        let encryptFio = null;
        if (data.fio) {
            encryptFio = this.personalCryptService.encryptData(data.fio);
        }

        let encryptPersonal = null;
        if (data.personal) {
            encryptPersonal = this.personalCryptService.encryptIvData(data.personal);
        }

        let encryptContact = null;
        if (data.contact?.length) {
            encryptContact = data.contact.map(v => ({
                identity_id: identity.id,
                contact_type: v.contact_type,
                contact_value: this.personalCryptService.encrypt(v.contact_value),
                contact_description: v.contact_description,
            }));
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
            encryptContact ? await this.contactSQL.insertList(encryptContact) : null,
        ]);

        return identity.id;
    }
}
