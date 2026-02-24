import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserService', () => {
  let service: UserService;

  let userRepo = {
    create: () => Promise.resolve({}),
    save: () => Promise.resolve({}),
    find: () => Promise.resolve({}),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService, 
        {
          provide: getRepositoryToken(User), 
          useValue: userRepo
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterAll(() => {
    jest.resetAllMocks(); // resets all mock implementations and call history
  });


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Can create ',async () => {
    //@ts-ignore
    const user: User = {
      email: 'john.doe@mgs.com',
      id: 1,
      password: 'lalilulelo'
    }

    jest.spyOn(userRepo, 'create').mockResolvedValueOnce(user);
    jest.spyOn(userRepo, 'save').mockResolvedValueOnce(user);
    const result = await service.create(user.email,user.password);

    expect(result.email).toBe(user.email);
    expect(result.password).toBe(user.password);
  });
});
