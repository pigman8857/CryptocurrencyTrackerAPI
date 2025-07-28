import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
const { fn }= jest
describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    guard = new AuthGuard();
  });

  it('should return true if userID is present in session', () => {
    const mockContext = {
      switchToHttp: fn().mockReturnThis(),
      getRequest: fn().mockReturnValue({
        session: {
          userID: 'some-user-id',
        },
      }),
    } as unknown as ExecutionContext;

    const canActivateResult = guard.canActivate(mockContext);
    expect(canActivateResult).toBe('some-user-id'); // returns truthy value
  });

  it('should return undefined if userID is not present', () => {
    const mockContext = {
      switchToHttp: fn().mockReturnThis(),
      getRequest: fn().mockReturnValue({
        session: {},
      }),
    } as unknown as ExecutionContext;

    const canActivateResult = guard.canActivate(mockContext);
    expect(canActivateResult).toBeUndefined(); // returns falsy value
  });
});
