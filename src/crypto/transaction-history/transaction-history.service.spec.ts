import { Test, TestingModule } from '@nestjs/testing';
import { TransactionHistoryService } from './transaction-history.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity';
import { Crypto } from '../entities/crypto.entity';
import { TransactionHistory } from './entities/transaction-history.entity';

describe('TransactionHistoryService', () => {
  let service: TransactionHistoryService;

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
        TransactionHistoryService,
        {
          provide: getRepositoryToken(User), 
          useValue: fakeUserRepo
        },
        {
          provide: getRepositoryToken(Crypto), 
          useValue: fakeCrypToRepo
        },
       {
          provide: getRepositoryToken(TransactionHistory), 
          useValue: fakeTransHistRepo
        }
      ],
    }).compile();

    service = module.get<TransactionHistoryService>(TransactionHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
