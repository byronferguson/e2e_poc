import { startElasticApmInstance } from '@bigblueswimschool/elastic-apm-nest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import helmet from 'helmet';
import requestIp from 'request-ip';
import request from 'supertest';
import { AppModule } from '~/app.module';
import { VERSION } from '~/constants';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    // INFO: Adding, but maybe should be avoided
    startElasticApmInstance();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'root',
          password: 'password',
          database: 'test',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    /**
     * Configure Global Middleware
     */
    app.use(requestIp.mw());
    app.use(helmet());
    app.setGlobalPrefix(`/v${VERSION}`);
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/info (GET)', () => {
    return request(app.getHttpServer()).get('/info').expect(200);
  });
});
