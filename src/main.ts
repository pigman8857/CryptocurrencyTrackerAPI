import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:8080', // allow your frontend origin
    methods: 'GET,POST,PUT,DELETE', // specify allowed methods
    credentials: true, // if using cookies or auth headers
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
