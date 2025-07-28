import { SerializeInterceptor } from './serialize.interceptor';
import { CallHandler, ExecutionContext } from '@nestjs/common';
import { Observable, of, lastValueFrom } from 'rxjs';
import { UserDTO } from '../../user/dto/user.dto';
import { plainToClass } from 'class-transformer';

describe('SerializeInterceptor', () => {

  describe('Test UserDTO ',() => {

    afterEach(() => {
      jest.resetAllMocks(); // resets all mock implementations and call history
    });


    const mockUser = {
      id: 1,
      email: 'user@example.com',
      password: 'secret',
      createdAt: new Date(),
    };

    const transformedUser = plainToClass(UserDTO, mockUser, {
      excludeExtraneousValues: true,
    });

    it('should transform response data using the provided DTO. Should have no password in the return object.', async () => {
      const interceptor = new SerializeInterceptor(UserDTO);

      const context = {} as ExecutionContext;

      const callHandler: CallHandler = {
        handle: () => of(mockUser),
      };

      const resultObservable = await interceptor.intercept(context, callHandler);
      const result = await lastValueFrom(resultObservable);

      expect(result).toEqual(transformedUser);
      expect(result).not.toHaveProperty('password');
      
    });
  })

});
