// eslint-disable-next-line @typescript-eslint/no-var-requires
const helmet = require('helmet');

import {
  ElasticApmErrorInterceptor,
  ElasticApmHttpUserContextInterceptor,
  startElasticApmInstance,
} from '@bigblueswimschool/elastic-apm-nest';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {
  BASE,
  TEMPLATE_HOSTNAME,
  TEMPLATE_HTTP_PORT,
  TEMPLATE_TCP_PORT,
  VERSION,
} from './constants';

async function bootstrap() {
  // The APM needs to be started before anything else is initialized
  const apm = startElasticApmInstance();

  // Prefer to error, and quit, if the APM cannot be connected
  if (!apm.isStarted()) {
    const error = 'Elastic APM NOT started!';
    Logger.error(error, 'Root');
    throw new Error(error);
  }
  Logger.log('Elastic APM started', 'Root');

  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);
  const HOSTNAME = configService.get<string>(TEMPLATE_HOSTNAME);
  const HTTP_PORT = Number(configService.get<string>(TEMPLATE_HTTP_PORT));
  const TCP_PORT = Number(configService.get<string>(TEMPLATE_TCP_PORT));

  const options = new DocumentBuilder()
    .setTitle('Nest Template')
    .setDescription('The service API description')
    .setVersion(`${VERSION}`)
    .addServer(`/v${VERSION}`)
    // .addTag('groupName')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`/v${VERSION}/${BASE}/api`, app, document);

  // Capture/log all errors to APM, and provide a hook to intercept/map UserContext for APM
  app.useGlobalInterceptors(
    app.get(ElasticApmErrorInterceptor),
    app.get(ElasticApmHttpUserContextInterceptor),
  );

  app.use(helmet());
  app.setGlobalPrefix(`/v${VERSION}`);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: TCP_PORT,
    },
  });

  await app.startAllMicroservicesAsync();
  await app.listen(HTTP_PORT);

  Logger.log(`Service ready on http://${HOSTNAME}:${HTTP_PORT}`, 'Root');
  Logger.log(`Microservice ready on tcp://${HOSTNAME}:${TCP_PORT}`, 'Root');
}
bootstrap();
