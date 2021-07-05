import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { config } from './common/config';

async function bootstrap() {
  let app;

  console.log('config.USE_FASTIFY');
  console.log(config.USE_FASTIFY);

  if (config.USE_FASTIFY === 'true') {
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );
  } else {
    app = await NestFactory.create(AppModule);
  }

  await app.listen(config.APP_PORT, '0.0.0.0');
}
bootstrap();
