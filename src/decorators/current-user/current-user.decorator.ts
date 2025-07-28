import {
    createParamDecorator,
    ExecutionContext
} from '@nestjs/common';

export const currentUserDecoratorFactory = (data: never, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  return request.currentUser;
}

export const CurrentUser = createParamDecorator (currentUserDecoratorFactory);