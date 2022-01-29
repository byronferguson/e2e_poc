import { ElasticApmModule } from '@bigblueswimschool/elastic-apm-nest';
import { NestHealthModule } from '@bigblueswimschool/nest-health-plugin';
import { NestInfoModule } from '@bigblueswimschool/nest-info-plugin';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from 'nest-router';
import { databaseConfigService } from './config/database-config.service';
import { routes } from './config/routes';
import { AuthGuardModule } from './guards/auth/auth.module';
import { ExampleModule } from './modules/example/example.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ElasticApmModule.register({
      httpUserMapFunction: (request: any) => ({
        id: request?.user?.id,
        username: request?.user?.username,
        email: request?.user?.email,
      }),
    }),
    TypeOrmModule.forRoot(databaseConfigService.getTypeOrmConfig()),
    AuthGuardModule,
    RouterModule.forRoutes(routes),
    NestInfoModule,
    NestHealthModule,
    // Import all service specific modules below
    ExampleModule,
  ],
})
export class AppModule {}
