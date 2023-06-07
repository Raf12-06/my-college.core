import {Injectable} from "@nestjs/common";
import * as crypto from "crypto";

@Injectable()
export class PersonalCryptService {

    private readonly STATIC_SALT_PERSONAL = process.env.STATIC_SALT_PERSONAL;
    private readonly PERSONAL_ALGORITHM = process.env.PERSONAL_ALGORITHM;
    private readonly PERSONAL_KEY = process.env.PERSONAL_KEY;

    //==================================
    //            Cipheriv
    //==================================
    encryptIv(data: string | number): string {
        const value = String(data);
        const iv = crypto.randomBytes(8).toString('hex');
        const cipher = crypto.createCipheriv(this.PERSONAL_ALGORITHM, this.PERSONAL_KEY, iv);
        let encrypted = cipher.update(value, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return `${encrypted}:${iv}`;
    }

    decryptIv(data: string): string {
        const [ encrypted, iv ] = data.split(':');
        const decipher = crypto.createDecipheriv(this.PERSONAL_ALGORITHM, this.PERSONAL_KEY, iv);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }

    encryptIvData(data: any): any {
        const encryptData = {};
        for (const key in data) {
            const value = data[key];
            encryptData[key] = this.encryptIv(value);
        }
        return encryptData;

    }

    decryptIvData(data: any): any {
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
    encrypt(data: string | number): string {
        const value = String(data);
        const cipher = crypto.createCipher(this.PERSONAL_ALGORITHM, this.PERSONAL_KEY);
        let encrypted = cipher.update(value, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }

    decrypt(data: string | number): string {
        const value = String(data);
        const cipher = crypto.createDecipher(this.PERSONAL_ALGORITHM, this.PERSONAL_KEY);
        let encrypted = cipher.update(value, 'hex', 'utf8');
        encrypted += cipher.final('utf8');
        return encrypted;
    }

    encryptData(data: any): any {
        const encryptData = {};
        for (const key in data) {
            const value = data[key];
            encryptData[key] = this.encrypt(value);
        }
        return encryptData;

    }

    decryptData(data: any): any {
        const decryptData = {};
        for (const key in data) {
            const value = data[key];
            if (typeof value === 'string') {
                decryptData[key] = this.decrypt(value);
            }
        }
        return decryptData;
    }

}
