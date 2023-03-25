import {Injectable} from '@nestjs/common';
import * as crypto from "crypto";
import {Identity} from "./model/identity.model";
import {InjectModel} from "@nestjs/sequelize";
import {Personal} from "./model/personal.model";
import {Fio} from "./model/fio.model";
import {UpdatePersonalDto} from "../../module/user/dto/update-personal.dto";

@Injectable()
export class PersonalService {

    private readonly STATIC_SALT_PERSONAL = process.env.STATIC_SALT_PERSONAL;
    private readonly PERSONAL_ALGORITHM = process.env.PERSONAL_ALGORITHM;
    private readonly PERSONAL_KEY = process.env.PERSONAL_KEY;

    constructor(
        @InjectModel(Identity)
        private identityRepository: typeof Identity,
        @InjectModel(Personal)
        private personalRepository: typeof Personal,
        @InjectModel(Fio)
        private fioRepository: typeof Fio,
    ) {}

    private getSecureHash(data: string | number): string {
        return crypto.createHash('sha512')
            .update(String(data))
            .update(this.STATIC_SALT_PERSONAL)
            .digest('hex');
    }

    //==================================
    //            Cipheriv
    //==================================
    private encryptIv(data: string | number): string {
        const value = String(data);
        const iv = crypto.randomBytes(8).toString('hex');
        const cipher = crypto.createCipheriv(this.PERSONAL_ALGORITHM, this.PERSONAL_KEY, iv);
        let encrypted = cipher.update(value, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return `${encrypted}:${iv}`;
    }

    private decryptIv(data: string): string {
        const [ encrypted, iv ] = data.split(':');
        const decipher = crypto.createDecipheriv(this.PERSONAL_ALGORITHM, this.PERSONAL_KEY, iv);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }

    private encryptIvData(data: any): any {
        const encryptData = {};
        for (const key in data) {
            const value = data[key];
            encryptData[key] = this.encryptIv(value);
        }
        return encryptData;

    }

    private decryptIvData(data: any): any {
        const decryptData = {};
        for (const key in data) {
            const value = data[key];
            if (typeof value === 'string') {
                decryptData[key] = this.decryptIv(value);
            }
        }
        return decryptData;
    }

    //==================================
    //             Cipher
    //==================================
    private encrypt(data: string | number): string {
        const value = String(data);
        const cipher = crypto.createCipher(this.PERSONAL_ALGORITHM, this.PERSONAL_KEY);
        let encrypted = cipher.update(value, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }

    private decrypt(data: string | number): string {
        const value = String(data);
        const cipher = crypto.createDecipher(this.PERSONAL_ALGORITHM, this.PERSONAL_KEY);
        let encrypted = cipher.update(value, 'hex', 'utf8');
        encrypted += cipher.final('utf8');
        return encrypted;
    }

    private encryptData(data: any): any {
        const encryptData = {};
        for (const key in data) {
            const value = data[key];
            encryptData[key] = this.encrypt(value);
        }
        return encryptData;

    }

    private decryptData(data: any): any {
        const decryptData = {};
        for (const key in data) {
            const value = data[key];
            if (typeof value === 'string') {
                decryptData[key] = this.decrypt(value);
            }
        }
        return decryptData;
    }

    //==================================
    //          personal info
    //==================================
    async getUserPersonalInfo(userId: number): Promise<{ personal: Personal, fio: Fio }> {
        const identityId = await this.getIdentityId(userId);

        const [
            encryptPersonal,
            encryptFio
        ] = await Promise.all([
            this.getPersonal(identityId),
            this.getFio(identityId)
        ])

        const [
            decryptPersonal,
            decryptFio,
        ] = await Promise.all([
            this.decryptIvData(encryptPersonal),
            this.decryptData(encryptFio),
        ])

        return {
            personal: decryptPersonal,
            fio: decryptFio,
        }
    }

    async updateUserPersonalInfo(userId: number, dto: UpdatePersonalDto): Promise<void> {
        const identityId = await this.getIdentityId(userId);

        if (dto.personal) {
            const encryptPersonal = await this.encryptIvData(dto.personal);
            await this.updatePersonal(identityId, encryptPersonal);
        }

        if (dto.fio) {
            const encryptFio = await this.encryptData(dto.fio);
            await this.updateFio(identityId, encryptFio);
        }
    }

    //==================================
    //           repositories
    //==================================
    async getIdentityId(userId: number): Promise<number> {
        const userSecure = this.getSecureHash(userId);
        return (await this.identityRepository.findOne({
            where: {
                user_secure: userSecure
            },
            attributes: ['id'],
            limit: 1,
        }))?.id;
    }

    async createIdentity(userId: number): Promise<Identity> {
        const secureHash = this.getSecureHash(userId);
        return await this.identityRepository.create({ user_secure: secureHash });
    }

    async updatePersonal(identityId: number, data: Partial<Personal>) {
        return await this.personalRepository.update(data, {
            where: {
                identity_id: identityId,
            }
        });
    }

    async getPersonal(identityId: number): Promise<Personal> {
        return await this.personalRepository.findOne({
            where: {
                identity_id: identityId,
            },
            raw: true,
        });
    }

    async updateFio(identityId: number, data: Partial<Fio>) {
        return await this.fioRepository.update(data, {
            where: {
                identity_id: identityId,
            }
        });
    }

    async getFio(identityId: number): Promise<Fio> {
        return await this.fioRepository.findOne({
            where: {
                identity_id: identityId,
            },
            raw: true,
        });
    }
}
