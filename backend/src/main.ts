import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*', // **дозволяє всі домени**
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true, // якщо передаєш куки або заголовки
    },
  });
  await app.listen(process.env.PORT ?? 3000);

  const url = await app.getUrl(); // <--- додано
  console.log(`🚀 App running at: ${url}`); // <--- додано
}
bootstrap();
