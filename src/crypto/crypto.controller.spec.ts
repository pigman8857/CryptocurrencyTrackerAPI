import { Test, TestingModule } from '@nestjs/testing';
import { CryptoController } from './crypto.controller';
import { CryptoService } from './crypto.service';
import { TransactionHistoryService } from './transaction-history/transaction-history.service';
import { ActCryptoDto } from './dto/act-crypto.dto';
import { TransactionHistory } from './transaction-history/entities/transaction-history.entity';

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
  let fakeTransHistService = {
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
          provide: TransactionHistoryService,
          useValue: fakeTransHistService
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
    const fakeTransactionId = 1;
    const fakeActCryptoDto: ActCryptoDto = {
      crypto: {  
          id: 1,
          name: "fakeCryptoName"
      },
      buyTime: new Date("2025-07-28T10:00:00.000Z"),
      priceAt: 100000,
      amount: 1,
      transactionType: "buy"
    };
    const user = {
      id: 1,
      email: "john.doe@mgs.com",
      password: "fakepassword",
      transactionHistories: [],
      logInsert: jest.fn(),
      logUpdate: jest.fn(),
      logRemove: jest.fn()
    };

    const fakeTransHistService_create_Result: TransactionHistory = {
      Amount: fakeActCryptoDto.amount,
      //@ts-ignore
      crypto: {id: fakeActCryptoDto.crypto.id, name: fakeActCryptoDto.crypto.name },
      PriceAt: fakeActCryptoDto.priceAt,
      transactionType: fakeActCryptoDto.transactionType,
      PriceTimeDate: fakeActCryptoDto.buyTime,
      id : fakeTransactionId,
      //@ts-ignore
      user: {id:user.id, email: user.email}
    } 

    const expectResult = {...fakeTransHistService_create_Result}    

    spyOn(fakeTransHistService,"create").mockResolvedValueOnce(fakeTransHistService_create_Result);

    const result = await controller.action(fakeCryptoId, fakeActCryptoDto, user);
    expect(result).toBeDefined();
    expect(result.Amount).toBe(expectResult.Amount)
    expect(result.PriceAt).toBe(expectResult.PriceAt)
    expect(result.PriceTimeDate).toBe(expectResult.PriceTimeDate)
    expect(fakeTransHistService.create).toHaveBeenCalledWith(fakeActCryptoDto, user);
  })
});
