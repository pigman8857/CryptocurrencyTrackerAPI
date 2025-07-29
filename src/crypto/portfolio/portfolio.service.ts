import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Portfolio } from './entities/portfolio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@user/entities/user.entity';
import { PurchaseCryptoDto } from '@src/crypto/dto/purchase-crypto.dto';


@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)private transHistRepo: Repository<Portfolio>,
    @InjectRepository(User)private UserRepo: Repository<User>,
    @InjectRepository(Crypto)private cryptoRepo: Repository<Crypto>,
  ){}
  

  async create(purchaseCryptoDto: PurchaseCryptoDto, user: User) {
    const createdHistory = await this.transHistRepo.create({
      DateOfPurchase: purchaseCryptoDto.dateOfPurchase,
      PurchasePrice: purchaseCryptoDto.purchasePrice,
      Amount: purchaseCryptoDto.amount,
      transactionType: purchaseCryptoDto.transactionType
    })
    
    createdHistory.user = user;

    //@ts-ignore
    createdHistory.crypto = {
      id:purchaseCryptoDto.crypto.id,
      name: purchaseCryptoDto.crypto.name,
    } 

    return await this.transHistRepo.save(createdHistory)
  }
}
