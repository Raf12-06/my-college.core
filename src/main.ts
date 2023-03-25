import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const PORT = process.env.PORT;

  const fastifyAdapter = new FastifyAdapter();
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastifyAdapter);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }))

  await app.listen(PORT, (() => {
    console.log(`Start on ${PORT}...`);
  }));
}

bootstrap();

