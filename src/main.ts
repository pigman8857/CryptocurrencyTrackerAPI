import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    // allow your frontend origin. First one is from local. Second is from docker container.
    origin: ['http://localhost:8080','http://localhost:3000'], 
    methods: 'GET,POST,PUT,DELETE,PATCH', // specify allowed methods
    credentials: true, // if using cookies or auth headers
  });

  //Use{ transform: true } to ensure this dto Query() transformation always happens
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
