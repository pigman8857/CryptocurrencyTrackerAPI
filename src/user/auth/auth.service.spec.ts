import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PasswordHasher } from '../../library_wrappers/passwordHasher';
import { User } from '../entities/user.entity';

// Mock dependencies
jest.mock('../../library_wrappers/passwordHasher');

describe('AuthService', () => {
  let service: AuthService;

  let fakeUserService: Partial<UserService>;

  beforeEach(async () => {

    const users: User[] = [];
    //Create a fake copy of the users service
    fakeUserService = {
        find: (email: string) => {
            const filteredUsers = users.filter(user => user.email == email);
            return Promise.resolve(filteredUsers);
        },
        create: (email: string, password: string) => {
            const user = {id: Math.floor(Math.random() * 999999),email,password} as User;
            users.push(user);            
            return Promise.resolve(user) ;
        }
                                      
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: fakeUserService }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('throws if an invalid password is provided', async () => {
    const hashedPassword = 'salt.hashpassword';
    (PasswordHasher.hash as jest.Mock).mockResolvedValue(hashedPassword);
    (PasswordHasher.verify as jest.Mock).mockResolvedValue(false);
    await service.signUp('laskdjf@alskdfj.com', 'password');

    await expect(
        service.signIn('laskdjf@alskdfj.com', 'passowrd123'),
    ).rejects.toThrow(new BadRequestException('bad password'));
  });

  it('Returns a user if correct password is provided', async () => {  
      const hashedPassword = 'salt.hashpassword';
      (PasswordHasher.hash as jest.Mock).mockResolvedValue(hashedPassword);
      (PasswordHasher.verify as jest.Mock).mockResolvedValue(true);
      await service.signUp('laskdjf@alskdfj.com', 'mypassword');
      const user = await service.signIn('laskdjf@alskdfj.com', 'mypassword');
  
      expect(user).toBeDefined();
  }) 
});
