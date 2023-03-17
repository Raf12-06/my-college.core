import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {

  const PORT = process.env.PORT;

  const fastifyAdapter = new FastifyAdapter();
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastifyAdapter);
  await app.listen(PORT, ((err, address) => {
    console.log(`Start on ${PORT}...`);
  }));
}

bootstrap();

