import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_SERVICE } from './constants';

@Injectable()
export class AuthService {
  constructor(@Inject(AUTH_SERVICE) private readonly client: ClientProxy) {}

  async validateToken(token: string): Promise<unknown> {
    Logger.log('Calling the microservice...', 'AuthService');

    const auth = await this.client.send({ cmd: 'auth.validateToken' }, { token }).toPromise();

    return auth;
  }
}
