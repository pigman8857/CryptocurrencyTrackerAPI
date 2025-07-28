import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TransactionHistory } from './entities/transaction-history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@user/entities/user.entity';
import { ActCryptoDto } from '@crypto/dto/act-crypto.dto';


@Injectable()
export class TransactionHistoryService {
  constructor(
    @InjectRepository(TransactionHistory)private transHistRepo: Repository<TransactionHistory>,
    @InjectRepository(User)private UserRepo: Repository<User>,
    @InjectRepository(Crypto)private cryptoRepo: Repository<Crypto>,
  ){}
  

  async create(actCrytoDto: ActCryptoDto, user: User) {
    const createdHistory = await this.transHistRepo.create({
      PriceTimeDate: actCrytoDto.buyTime,
      PriceAt: actCrytoDto.priceAt,
      Amount: actCrytoDto.amount,
      transactionType: actCrytoDto.transactionType
    })
    
    createdHistory.user = user;

    //@ts-ignore
    createdHistory.crypto = {
      id:actCrytoDto.crypto.id,
      name: actCrytoDto.crypto.name,
    } 

    return await this.transHistRepo.save(createdHistory)
  }
}
