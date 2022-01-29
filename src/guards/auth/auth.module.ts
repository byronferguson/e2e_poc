import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AUTH_HOSTNAME, AUTH_SERVICE, AUTH_TCP_PORT } from './constants';

@Global()
@Module({
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: AUTH_SERVICE,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>(AUTH_HOSTNAME),
            port: Number(configService.get<string>(AUTH_TCP_PORT)),
          },
        });
      },
    },
  ],
  exports: [AuthService],
})
export class AuthGuardModule {}
