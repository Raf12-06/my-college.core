import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import fastifyMultipart from "@fastify/multipart";
import { join } from 'path';
import { readdirSync } from 'fs';

async function bootstrap() {

  const PORT = process.env.PORT;

  const fastifyAdapter = new FastifyAdapter();
  fastifyAdapter.register(fastifyMultipart, {
    limits: {
      fieldNameSize: 1024, // Max field name size in bytes
      fieldSize: 128 * 1024 * 1024 * 1024, // Max field value size in bytes
      fields: 10, // Max number of non-file fields
      fileSize: 128 * 1024 * 1024 * 1024, // For multipart forms, the max file size
      files: 2, // Max number of file fields
      headerPairs: 2000, // Max number of header key=>value pairs
    },
  });
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastifyAdapter);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));

  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
  });

  app.setViewEngine({
    engine: {
      handlebars: require('handlebars'),
    },
    root: join(__dirname, '..', 'views'),
    options: {
      partials: Object.fromEntries(
          readdirSync(join(__dirname, '..', 'views/partials'))
              .map(v => [v.slice(null, -4), 'partials/' + v])
      )
    }
  });

  await app.listen(PORT, (() => {
    console.log(`Start on ${PORT}...`);
  }));
}

bootstrap();

