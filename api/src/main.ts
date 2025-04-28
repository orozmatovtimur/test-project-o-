import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  const PORT = process.env.PORT || 8000;
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', 
    credentials: true,
    methods: '*',
    allowedHeaders: 'Content-Type, Authorization', // явно разрешить заголовки
  });
  await app.listen(PORT, () => console.log('Server started at port: ', PORT));
}
start();
