import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ClientPlatformId = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.headers['client-platform-id'] ?? null;
});
