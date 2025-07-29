import { Test, TestingModule } from '@nestjs/testing';
import { CryptoController } from './crypto.controller';
import { CryptoService } from './crypto.service';
import { PortfolioService } from '@portfolio/portfolio.service';
import { PurchaseCryptoDto } from './dto/purchase-crypto.dto';
import { Portfolio } from '@portfolio/entities/portfolio.entity';

const {spyOn, fn, resetAllMocks} = jest;

describe('CryptoController', () => {
  let controller: CryptoController;
  let fakeCryptoService = {
    create: fn(),
    findAll: fn(),
    findOne: fn(),
    update: fn(),
    remove: fn()
  };
  let fakePortfolioService = {
    create: fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CryptoController],
      providers: [
        CryptoService,
        {
          provide: CryptoService,
          useValue: fakeCryptoService
        },
        {
          provide: PortfolioService,
          useValue: fakePortfolioService
        }
      ],
    }).compile();

    controller = module.get<CryptoController>(CryptoController);
  });

  afterAll(()=>{
    resetAllMocks();
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('crypto/act/:cryptoId able to create transaction history', async() => {
    const fakeCryptoId = 1;
    const fakePortfolioId = 1;
    const fakePurchaseCryptoDto: PurchaseCryptoDto = {
      crypto: {  
          id: 1,
          name: "fakeCryptoName"
      },
      dateOfPurchase: new Date("2025-07-28T10:00:00.000Z"),
      purchasePrice: 100000,
      amount: 1,
      transactionType: "buy"
    };
    const user = {
      id: 1,
      email: "john.doe@mgs.com",
      password: "fakepassword",
      portfolios: [],
      logInsert: jest.fn(),
      logUpdate: jest.fn(),
      logRemove: jest.fn()
    };

    const fakePortfolioService_create_Result = {
      Amount: fakePurchaseCryptoDto.amount,
      crypto: {id: fakePurchaseCryptoDto.crypto.id, name: fakePurchaseCryptoDto.crypto.name },
      PurchasePrice: fakePurchaseCryptoDto.purchasePrice,
      transactionType: fakePurchaseCryptoDto.transactionType,
      DateOfPurchase: fakePurchaseCryptoDto.dateOfPurchase,
      id : fakePortfolioId,
      user: {id:user.id, email: user.email }
    } 

    const expectResult = {...fakePortfolioService_create_Result}    

    spyOn(fakePortfolioService,"create").mockResolvedValueOnce(fakePortfolioService_create_Result);

    const result = await controller.action(fakeCryptoId, fakePurchaseCryptoDto, user);
    expect(result).toBeDefined();
    expect(result.Amount).toBe(expectResult.Amount)
    expect(result.PurchasePrice).toBe(expectResult.PurchasePrice)
    expect(result.DateOfPurchase).toBe(expectResult.DateOfPurchase)
    expect(fakePortfolioService.create).toHaveBeenCalledWith(fakePurchaseCryptoDto, user);
  })
});
