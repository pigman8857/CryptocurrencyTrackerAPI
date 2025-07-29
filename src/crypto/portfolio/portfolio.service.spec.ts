import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioService } from './portfolio.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Portfolio } from './entities/portfolio.entity';
import { User } from '@user/entities/user.entity';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { CreateCryptoDto } from '@src/crypto/dto/create-crypto.dto';

const { spyOn, resetAllMocks, fn } = jest;

describe('PortfolioService', () => {
  let service: PortfolioService;
  let fakeRepo: any;

  beforeEach(async () => {
    fakeRepo = {
      create: fn(),
      save: fn(),
      findOne: fn(),
      update: fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PortfolioService,
        {
          provide: getRepositoryToken(Portfolio),
          useValue: fakeRepo,
        },
      ],
    }).compile();

    service = module.get<PortfolioService>(PortfolioService);
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
      const mockPortfolio = { id: 1, amount: 10 };
      spyOn(fakeRepo, 'findOne').mockResolvedValue(mockPortfolio);

      expect(await service.findOne(1)).toEqual(mockPortfolio);
    });
  });

  describe('create()', () => {
    it('creates portfolio from DTO and user', async () => {
      const crypto: CreateCryptoDto = { id: 1, name: 'BTC' };
      const dto: CreatePortfolioDto = {
        crypto,
        dateOfPurchase: new Date(),
        purchasePrice: 1000,
        amount: 2,
      };
      const user: User = { id: 1, email: 'john.doe@mgs.com' } as User;

      const mockPortfolio = {
        ...dto,
        user,
        crypto,
        id: 99,
      };

      spyOn(fakeRepo, 'create').mockReturnValue(mockPortfolio);
      spyOn(fakeRepo, 'save').mockResolvedValue(mockPortfolio);

      const result = await service.create(dto, user);
      expect(result).toEqual(mockPortfolio);
      expect(fakeRepo.create).toHaveBeenCalledWith({
        DateOfPurchase: dto.dateOfPurchase,
        PurchasePrice: dto.purchasePrice,
        Amount: dto.amount,
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
        crypto: { id: 2, name: 'DOGE' },
        dateOfPurchase: new Date('2025-07-29T10:00:00.000Z'),
        purchasePrice: 250,
        amount: 8,
      };
      const user: User = { id: 5, email: 'john.doe@mgs.com'  } as User;

      spyOn(fakeRepo, 'update').mockResolvedValue({ affected: 1 });

      const result = await service.update(10, dto, user);
      expect(fakeRepo.update).toHaveBeenCalledWith(10, {
        DateOfPurchase: dto.dateOfPurchase,
        PurchasePrice: dto.purchasePrice,
        Amount: dto.amount,
        user,
        crypto: dto.crypto,
      });
      expect(result).toEqual({ affected: 1 });
    });
  });
});
