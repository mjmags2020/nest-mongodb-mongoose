import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global Validation - enabales validation to all
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
      skipUndefinedProperties: false,
      enableDebugMessages: true,
    }),
  );
  await app.listen(3001);
}
bootstrap();
