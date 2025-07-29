import { Test, TestingModule } from '@nestjs/testing';
import { CryptoService } from './crypto.service';
import { Crypto } from './entities/crypto.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

const { spyOn, resetAllMocks, fn} = jest;

describe('CryptoService', () => {
  let service: CryptoService;
  let fakeCryptoRepo: Repository<Crypto>;

  beforeEach(async () => {
    const mockRepo = {
      findOne: fn(),
      find: fn(),
      create: fn(),
      save: fn(),
      update: fn(),
      remove: fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CryptoService,
        {
          provide: getRepositoryToken(Crypto),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<CryptoService>(CryptoService);
    fakeCryptoRepo = module.get<Repository<Crypto>>(getRepositoryToken(Crypto));

    resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('throws if crypto already exists', async () => {

      spyOn(fakeCryptoRepo,"findOne").mockResolvedValue({ id: 1, name: 'BTC',portfolios: null  });

      await expect(service.create({ id: 1, name: 'BTC' })).rejects.toThrow(BadRequestException);
    });

    it('creates new crypto if not existing', async () => {
      spyOn(fakeCryptoRepo,"findOne").mockResolvedValue(null);
      spyOn(fakeCryptoRepo,"create").mockReturnValue({ id: 2, name: 'ETH',portfolios: null  });
      spyOn(fakeCryptoRepo,"save").mockResolvedValue({ id: 2, name: 'ETH',portfolios: null  });

      const result = await service.create({ id: 2, name: 'ETH'});
      expect(result).toEqual({ id: 2, name: 'ETH',portfolios: null});
    });
  });

  describe('findAll()', () => {
    it('returns crypto list', async () => {
      const mockList = [{ id: 1, name: 'BTC',portfolios: null  }, { id: 2, name: 'ETH',portfolios: null }];
      spyOn(fakeCryptoRepo,"find").mockResolvedValue(mockList);
      expect(await service.findAll()).toEqual(mockList);
    });
  });

  describe('findOne()', () => {
    it('returns null if no id', async () => {
      expect(await service.findOne(undefined)).toBeNull();
    });

    it('finds one crypto by id', async () => {
      spyOn(fakeCryptoRepo,"findOne").mockResolvedValue({ id: 1, name: 'BTC',portfolios: null  });
      expect(await service.findOne(1)).toEqual({ id: 1, name: 'BTC',portfolios: null });
    });
  });

  describe('update()', () => {
    it('returns null if no id', async () => {
      expect(await service.update(undefined, { name: 'LTC' })).toBeNull();
    });

    it('throws if crypto not found', async () => {
      spyOn(fakeCryptoRepo,"findOne").mockResolvedValue(null);
      await expect(service.update(3, { name: 'LTC' })).rejects.toThrow(BadRequestException);
    });

    it('updates crypto name', async () => {
      spyOn(fakeCryptoRepo,"findOne").mockResolvedValue({ id: 3, name: 'DOGE',portfolios: null  });
      //@ts-ignore
      spyOn(fakeCryptoRepo,"update").mockResolvedValue({ affected: 1 });

      const result = await service.update(3, { name: 'LTC' });
      expect(fakeCryptoRepo.update).toHaveBeenCalledWith(3, { name: 'LTC' });
      expect(result).toEqual({ affected: 1 });
    });
  });

  describe('remove()', () => {
    it('throws if crypto not found', async () => {
      spyOn(fakeCryptoRepo,"findOne").mockResolvedValue(null);
      await expect(service.remove(4)).rejects.toThrow(BadRequestException);
    });

    it('removes crypto entity', async () => {
      const crypto = { id: 4, name: 'XRP', portfolios: null };

      spyOn(fakeCryptoRepo,"findOne").mockResolvedValue(crypto);
     
      spyOn(fakeCryptoRepo,"remove").mockResolvedValue(crypto);

      expect(await service.remove(4)).toEqual(crypto);
    });
  });
});