import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://wedding-app-delta.vercel.app/',
    credentials: true,
  });
  const port = process.env.PORT || 8002;
  await app.listen(port);
}
bootstrap();
