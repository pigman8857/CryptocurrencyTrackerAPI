import { ExecutionContext } from '@nestjs/common';
import { currentUserDecoratorFactory } from './current-user.decorator';

describe('CurrentUserDecoratorFactory', () => {
  it('should return currentUser from the request object', () => {
    const mockUser = { id: 42, email: 'test@example.com' };

    const mockContext: ExecutionContext = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
          currentUser: mockUser,
        }),
      }),
    } as unknown as ExecutionContext;

    //@ts-ignore
    const result = currentUserDecoratorFactory(null, mockContext);
    expect(result).toEqual(mockUser);
  });

  it('should return undefined if currentUser is not present', () => {
    const mockContext: ExecutionContext = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({}),
      }),
    } as unknown as ExecutionContext;

    //@ts-ignore
    const result = currentUserDecoratorFactory(null, mockContext);
    expect(result).toBeUndefined();
  });
});
