/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import dotenv from 'dotenv';

async function bootstrap() {
  // dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(8080);
}
bootstrap();