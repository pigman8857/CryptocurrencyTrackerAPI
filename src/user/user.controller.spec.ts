import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { AuthService } from './auth/auth.service';
import { UserService } from './user.service';
import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from './entities/user.entity';

describe('UserController', () => {
  let controller: UserController;
  let fakeUserService;
  let fakeAuthService = {
    signUp: (email: string, password: string) => Promise.resolve({}),
    signIn: (email: string, password: string) => Promise.resolve({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers:[
        { provide: UserService, useValue: fakeUserService },
        { provide: AuthService, useValue: fakeAuthService }
      ]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Can create user', async() => {

    const createuserDTO: CreateUserDTO = {
      email: "john.doe@mgs.com",
      password: "lalilulelo"
    }

    //@ts-ignore
    const createdUser = {
      email: "john.doe@mgs.com",
      id: 1,
      password: "lalilulelo"
    }

    jest.spyOn(fakeAuthService,'signUp').mockResolvedValue(createdUser);

    const session = {}

    const result = await controller.createUser(createuserDTO,session);

    expect(result).toBe(createdUser);
  });
});
