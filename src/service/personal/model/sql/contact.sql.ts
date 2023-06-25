import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Contact} from "../contact.model";

@Injectable()
export class ContactSql {

    constructor(
        @InjectModel(Contact)
        private contactRepo: typeof Contact,
    ) {}

    async insertList(data: Partial<Contact>[]): Promise<Contact[]> {
        return await this.contactRepo.bulkCreate(data);
    }

    async getContact(idIdentity: number): Promise<Contact[]> {
        return await this.contactRepo.findAll({
            where: {
                identity_id: idIdentity,
            }
        });
    }

    async updateContact(idContact: number, data: Partial<Contact>) {
        return await this.contactRepo.update(data, {
            where: {
                id: idContact
            },
        });
    }
}
