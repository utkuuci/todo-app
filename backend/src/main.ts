import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle("posteffectai case study")
    .setDescription("This is to do app")
    .setVersion("1.0")
    .addBearerAuth()
    .build()
  
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);

  await app.listen(5000);
}
bootstrap();
