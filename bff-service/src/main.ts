import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 4000;
  console.log(`PRODUCTS: ${process.env.PRODUCTS}`);
  await app.listen(PORT);
}
bootstrap();
