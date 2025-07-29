import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioController } from './portfolio.controller';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { CryptoService } from '@crypto/crypto.service';
import { PortfolioService } from './portfolio.service';

const {spyOn, fn, resetAllMocks} = jest;

describe('PortfolioController', () => {
  let controller: PortfolioController;
  let fakePortfolioService = {
    create: fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortfolioController],
      providers: [
        {
          provide: PortfolioService,
          useValue: fakePortfolioService
        }
      ]
    }).compile();

    controller = module.get<PortfolioController>(PortfolioController);
  });

  afterAll(()=>{
    resetAllMocks();
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('crypto/portfolio able to create porfolio', async() => {
    const fakeCryptoId = 1;
    const fakePortfolioId = 1;
    const fakeCreateCryptoDto: CreatePortfolioDto = {
      crypto: {  
          id: 1,
          name: "fakeCryptoName"
      },
      dateOfPurchase: new Date("2025-07-28T10:00:00.000Z"),
      purchasePrice: 100000,
      amount: 1,
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
      Amount: fakeCreateCryptoDto.amount,
      crypto: {id: fakeCreateCryptoDto.crypto.id, name: fakeCreateCryptoDto.crypto.name },
      PurchasePrice: fakeCreateCryptoDto.purchasePrice,
      DateOfPurchase: fakeCreateCryptoDto.dateOfPurchase,
      id : fakePortfolioId,
      user: {id:user.id, email: user.email }
    } 

    const expectResult = {...fakePortfolioService_create_Result}    

    spyOn(fakePortfolioService,"create").mockResolvedValueOnce(fakePortfolioService_create_Result);

    const result = await controller.create(fakeCreateCryptoDto, user);
    expect(result).toBeDefined();
    expect(result.Amount).toBe(expectResult.Amount)
    expect(result.PurchasePrice).toBe(expectResult.PurchasePrice)
    expect(result.DateOfPurchase).toBe(expectResult.DateOfPurchase)
    expect(fakePortfolioService.create).toHaveBeenCalledWith(fakeCreateCryptoDto, user);
  })
});
