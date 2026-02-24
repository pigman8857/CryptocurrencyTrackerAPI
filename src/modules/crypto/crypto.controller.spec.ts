import { Test, TestingModule } from '@nestjs/testing';
import { CryptoController } from './crypto.controller';
import { CryptoService } from './crypto.service';
import { PortfolioService } from '@portfolio/portfolio.service';
import { CreateCryptoDto } from './dto/create-crypto.dto';
import { UpdateCryptoDto } from './dto/update-crypto.dto';
import { Crypto } from './entities/crypto.entity';

const { spyOn, fn, resetAllMocks } = jest;

describe('CryptoController', () => {
  let controller: CryptoController;

  const fakeCryptoService = {
    create: fn(),
    findAll: fn(),
    findOne: fn(),
    update: fn(),
    remove: fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CryptoController],
      providers: [
        CryptoService,
        {
          provide: CryptoService,
          useValue: fakeCryptoService
        }
      ],
    }).compile();

    controller = module.get<CryptoController>(CryptoController);
  });

  afterAll(() => {
    resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call cryptoService.create on create()', async () => {
    const dto: CreateCryptoDto = { id: 1, name: 'Bitcoin' };
    const fakeCryptoServiceCreate = { id: 1, ...dto };
    spyOn(fakeCryptoService,"create").mockResolvedValue(fakeCryptoServiceCreate);

    const result = await controller.create(dto);
    expect(fakeCryptoService.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(fakeCryptoServiceCreate);
  });

  it('should call cryptoService.findAll on findAll()', async () => {
    const fakeCryptoServiceFindAll = [{ id: 1, name: 'Ethereum', symbol: 'ETH' }];
    spyOn(fakeCryptoService,"findAll").mockResolvedValue(fakeCryptoServiceFindAll);

    const result = await controller.findAll();
    expect(fakeCryptoService.findAll).toHaveBeenCalled();
    expect(result).toEqual(fakeCryptoServiceFindAll);
  });

  it('should call cryptoService.findOne on findOne()', async () => {
    const fakeCryptoServiceFindOne = { id: 1, name: 'Solana', symbol: 'SOL' };
    spyOn(fakeCryptoService,"findOne").mockResolvedValue(fakeCryptoServiceFindOne);

    const result = await controller.findOne('1');
    expect(fakeCryptoService.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(fakeCryptoServiceFindOne);
  });

  it('should call cryptoService.update on update()', async () => {
    const dto: UpdateCryptoDto = { name: 'Bitcoin' };
    const fakeCryptoServiceUpdate = { id: 1, ...dto };
    spyOn(fakeCryptoService,"update").mockResolvedValue(fakeCryptoServiceUpdate);

    const result = await controller.update('1', dto);
    expect(fakeCryptoService.update).toHaveBeenCalledWith(1, dto);
    expect(result).toEqual(fakeCryptoServiceUpdate);
  });

  it('should call cryptoService.remove on remove()', async () => {
    const fakeCryptoServiceRemove = { id: 1, name: 'Removed Coin', symbol: 'DEL' };
    spyOn(fakeCryptoService,"remove").mockResolvedValue(fakeCryptoServiceRemove);

    const result = await controller.remove('1');
    expect(fakeCryptoService.remove).toHaveBeenCalledWith(1);
    expect(result).toEqual(fakeCryptoServiceRemove);
  });
});
