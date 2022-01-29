import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthAccountId = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request?.user?.accountId ?? null;
});
