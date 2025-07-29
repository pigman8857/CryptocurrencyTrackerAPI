import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Portfolio } from './entities/portfolio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@user/entities/user.entity';
import { CreatePortfolioDto } from '@portfolio/dto/create-portfolio.dto';


@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)private portfolioRepo: Repository<Portfolio>
  ){}
  

  async create(purchaseCryptoDto: CreatePortfolioDto, user: User) {
    const createdHistory = await this.portfolioRepo.create({
      DateOfPurchase: purchaseCryptoDto.dateOfPurchase,
      PurchasePrice: purchaseCryptoDto.purchasePrice,
      Amount: purchaseCryptoDto.amount,
    })
    
    createdHistory.user = user;

    //@ts-ignore
    createdHistory.crypto = {
      id:purchaseCryptoDto.crypto.id,
      name: purchaseCryptoDto.crypto.name,
    } 

    return await this.portfolioRepo.save(createdHistory)
  }
}
