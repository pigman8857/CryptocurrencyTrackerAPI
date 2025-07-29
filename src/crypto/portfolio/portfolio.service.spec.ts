import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioService } from './portfolio.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Portfolio } from './entities/portfolio.entity';
import { User } from '@user/entities/user.entity';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { CreateCryptoDto } from '@src/crypto/dto/create-crypto.dto';
import { Repository } from 'typeorm';

const { spyOn, resetAllMocks, fn } = jest;

describe('PortfolioService', () => {
  let service: PortfolioService;
  let fakePortfolioRepo: Repository<Portfolio>;

  beforeEach(async () => {
    const mockPortfolioRepo = {
      create: fn(),
      save: fn(),
      findOne: fn(),
      update: fn(),
      remove: fn(),
      find: fn()
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PortfolioService,
        {
          provide: getRepositoryToken(Portfolio),
          useValue: mockPortfolioRepo,
        },
      ],
    }).compile();

    service = module.get<PortfolioService>(PortfolioService);
    fakePortfolioRepo = module.get<Repository<Portfolio>>(getRepositoryToken(Portfolio));
    resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne()', () => {
    it('returns null if no id provided', async () => {
      expect(await service.findOne(undefined)).toBeNull();
    });

    it('returns portfolio when found', async () => {
      const mockPortfolio = { id: 1, Amount: 10, PurchasePrice: 999, DateOfPurchase: new Date('2025-07-29T10:00:00.000Z') };
      //@ts-ignore
      spyOn(fakePortfolioRepo, 'findOne').mockResolvedValue(mockPortfolio);

      expect(await service.findOne(1)).toEqual(mockPortfolio);
    });
  });

  describe('create()', () => {
    it('creates portfolio from DTO and user', async () => {
      const crypto: CreateCryptoDto = { id: 1, name: 'BTC' };
      const createDate = new Date('2025-07-29T10:00:00.000Z');
      const dto: CreatePortfolioDto = {
        crypto,
        dateOfPurchase: createDate,
        purchasePrice: 1000,
        amount: 2,
      };
      const user: User = { id: 1, email: 'john.doe@mgs.com' } as User;

      const mockPortfolio = {
        user,
        crypto,
        id: 99,
        amount: 10, 
        purchasePrice: 999, 
        dateOfPurchase: createDate
      };


      //@ts-ignore
      spyOn(fakePortfolioRepo, 'create').mockReturnValue(mockPortfolio);
      //@ts-ignore
      spyOn(fakePortfolioRepo, 'save').mockResolvedValue(mockPortfolio);

      const result = await service.create(dto, user);
      expect(result).toEqual(mockPortfolio);
      expect(fakePortfolioRepo.create).toHaveBeenCalledWith({
        dateOfPurchase: dto.dateOfPurchase,
        purchasePrice: dto.purchasePrice,
        amount: dto.amount,
      });
    });
  });

  describe('update()', () => {
    it('returns null if id is undefined', async () => {
      const dto: UpdatePortfolioDto = {
        id: undefined,
        crypto: { id: 1, name: 'ETH' },
        dateOfPurchase: new Date(),
        purchasePrice: 500,
        amount: 3,
      };
      const user: User = { id: 1 } as User;

      expect(await service.update(undefined, dto, user)).toBeNull();
    });

    it('updates portfolio data correctly', async () => {
      const dto: UpdatePortfolioDto = {
        id: 10,
        //@ts-ignore
        crypto: { id: 2 },
        dateOfPurchase: new Date('2025-07-29T10:00:00.000Z'),
        purchasePrice: 250,
        amount: 8,
      };
      const user: User = { id: 5, email: 'john.doe@mgs.com'  } as User;

      //@ts-ignore
      spyOn(fakePortfolioRepo, 'update').mockResolvedValue({ affected: 1 });

      const result = await service.update(1, dto, user);
      expect(fakePortfolioRepo.update).toHaveBeenCalledWith(1, {
        dateOfPurchase: dto.dateOfPurchase,
        purchasePrice: dto.purchasePrice,
        amount: dto.amount,
        user,
        crypto: dto.crypto,
      });
      expect(result).toEqual({ affected: 1 });
    });
  });

  describe('findOneBelongsToUser()', () => {
    it('returns null if id or user not provided', async () => {
      expect(await service.findOneBelongsToUser(undefined, undefined)).toBeNull();
      expect(await service.findOneBelongsToUser({ id: undefined } as User, 1)).toBeNull();
    });

    it('returns portfolio with user and crypto relation when found', async () => {
      const mockUser: User = { id: 3 } as User;
      const mockPortfolio = { id: 5, user: mockUser, crypto: { id: 99, name: 'BTC' } };
      
      //@ts-ignore
      spyOn(fakePortfolioRepo, 'findOne').mockResolvedValue(mockPortfolio);

      const result = await service.findOneBelongsToUser(mockUser, 5);
      expect(fakePortfolioRepo.findOne).toHaveBeenCalledWith({
        where: {
          id: 5,
          user: {
            id: 3,
          },
        },
        relations: ['crypto', 'user'],
      });
      expect(result).toEqual(mockPortfolio);
    });
  });

  describe('remove()', () => {
    it('returns null if no id provided', async () => {
      expect(await service.remove(undefined)).toBeNull();
    });

    it('throws BadRequestException if portfolio not found', async () => {
      spyOn(service, 'findOne').mockResolvedValue(null);

      await expect(service.remove(10)).rejects.toThrow('The portfolio not found');
    });

    it('removes portfolio when found', async () => {
      //@ts-ignore
      const mockPortfolio = { id: 15, amount: 99 } as Portfolio;
      spyOn(service, 'findOne').mockResolvedValue(mockPortfolio);
      spyOn(fakePortfolioRepo, 'remove').mockResolvedValue(mockPortfolio);

      const result = await service.remove(15);
      expect(service.findOne).toHaveBeenCalledWith(15);
      expect(fakePortfolioRepo.remove).toHaveBeenCalledWith(mockPortfolio);
      expect(result).toEqual(mockPortfolio);
    });
  });

});
