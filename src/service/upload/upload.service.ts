import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import fastify = require('fastify');
import * as path from "path";
import * as fs from "fs";

@Injectable()
export class UploadService {

    async uploadFile(req: fastify.FastifyRequest) {

        const uploadFiles: {
            image: string[],
            application: string[],
        } = {
            image: [],
            application: [],
        };

        if (!req.isMultipart()) {
            throw new HttpException('Файл не передан', HttpStatus.BAD_REQUEST);
        }

        return new Promise((resolve, reject) => {
            req.multipart(handler, (err => {
                if (err) {
                    reject(new HttpException('Ошибка при загрузке файла', HttpStatus.INTERNAL_SERVER_ERROR))
                }
                resolve(uploadFiles);
            }));

            function handler(field, file, filename, encoding, mimetype: string) {
                if (mimetype.match(/^image\/(.*)/)) {

                    const imagePath = path.resolve(`static/image`);
                    if (!fs.existsSync(imagePath)) {
                        fs.mkdirSync(imagePath, { recursive: true });
                    }

                    const stream = fs.createWriteStream(`${imagePath}/${filename}`);
                    file.pipe(stream);
                    uploadFiles.image.push(`image/${filename}`);
                } else {
                    const imagePath = path.resolve(`static/application`);
                    if (!fs.existsSync(imagePath)) {
                        fs.mkdirSync(imagePath, { recursive: true });
                    }

                    const stream = fs.createWriteStream(`${imagePath}/${filename}`);
                    file.pipe(stream);
                    uploadFiles.application.push(`application/${filename}`);
                }
            }
        })
    }
}
