import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioService } from './portfolio.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@user/entities/user.entity';
import { Crypto } from '@crypto/entities/crypto.entity';
import { Portfolio } from './entities/portfolio.entity';

describe('PortfolioService', () => {
  let service: PortfolioService;

  let fakeUserRepo = {
    create: () => Promise.resolve({}),
    save: () => Promise.resolve({}),
    find: () => Promise.resolve({}),
  }

  let fakeCrypToRepo = {
    create: () => Promise.resolve({}),
    save: () => Promise.resolve({}),
    find: () => Promise.resolve({}),
    findOne: () => Promise.resolve({}),
    remove: () => Promise.resolve({}),
  }

  let fakeTransHistRepo = {
    create: () => Promise.resolve({}),
    save: () => Promise.resolve({}),
    find: () => Promise.resolve({}),
    
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PortfolioService,
        {
          provide: getRepositoryToken(User), 
          useValue: fakeUserRepo
        },
        {
          provide: getRepositoryToken(Crypto), 
          useValue: fakeCrypToRepo
        },
       {
          provide: getRepositoryToken(Portfolio), 
          useValue: fakeTransHistRepo
        }
      ],
    }).compile();

    service = module.get<PortfolioService>(PortfolioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
