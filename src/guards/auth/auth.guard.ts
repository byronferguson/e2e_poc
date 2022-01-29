import { CanActivate, ExecutionContext, Inject, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger: Logger;

  constructor(
    private readonly reflector: Reflector,
    @Inject('AuthService') private readonly authService: AuthService,
  ) {
    this.logger = new Logger('AuthGuard');
  }

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    // Determine roles on routeHandler before checking auth / roles
    const controllerRoles = this.reflector.get<string[]>('roles', ctx.getHandler()) ?? [];
    const routeRoles = this.reflector.get<string[]>('roles', ctx.getClass()) ?? [];

    const roles = new Set([...controllerRoles, ...routeRoles]);
    if (!roles.size || roles.has('all')) {
      return true;
    }

    const request = ctx.switchToHttp().getRequest();
    const token = this.extractToken(request);

    this.logger.debug(`token: ${token}`);

    if (token) {
      // Attempt to authenticate, and fetch roles
      const auth = await this.authService.validateToken(token);
      request.user = auth;

      return Boolean(auth);

      // check roles for match
    }

    return false;
  }

  private extractToken(request: Request): string | null {
    const extractBearerToken = ExtractJwt.fromAuthHeaderAsBearerToken();

    return extractBearerToken(request);
  }
}
