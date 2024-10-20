import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerConfig } from './config/swagger.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  SwaggerConfig(app);
  app.useGlobalPipes(new ValidationPipe());
  const { PORT, HOST } = process.env;
  await app.listen(PORT, () => {
    console.log("Server is running...");
    console.log(`APIs: http://${HOST}:${PORT}/api`);
  });
}
bootstrap();
