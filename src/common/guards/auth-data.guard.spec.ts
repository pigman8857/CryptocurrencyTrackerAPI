import { AuthDataGuard } from './auth-data.guard';
import { ExecutionContext } from '@nestjs/common';

describe('AuthDataGuard', () => {
  let guard: AuthDataGuard;

  beforeEach(() => {
    guard = new AuthDataGuard();
  });

  const createMockContext = (body: any): ExecutionContext => {
    return {
      switchToHttp: () => ({
        getRequest: () => ({ body }),
      }),
    } as unknown as ExecutionContext;
  };

  it('should return true if both email and password are present', () => {
    const mockContext = createMockContext({ email: 'john.doe@mgs.com', password: 'fakePassword' });
    expect(guard.canActivate(mockContext)).toBe(true);
  });

  it('should return false if email is missing', () => {
    const mockContext = createMockContext({ password: 'fakePassword' });
    expect(guard.canActivate(mockContext)).toBe(false);
  });

  it('should return false if password is missing', () => {
    const mockContext = createMockContext({ email: 'john.doe@mgs.com' });
    expect(guard.canActivate(mockContext)).toBe(false);
  });

  it('should return false if both email and password are missing', () => {
    const mockContext = createMockContext({});
    expect(guard.canActivate(mockContext)).toBe(false);
  });
});
