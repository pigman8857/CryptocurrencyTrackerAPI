import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Portfolio } from './entities/portfolio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@user/entities/user.entity';
import { CreatePortfolioDto } from '@portfolio/dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';


@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)private portfolioRepo: Repository<Portfolio>
  ){}
  
  async findOne(id: number): Promise<Portfolio>{
    if(!id){
      return null;
    }

    return this.portfolioRepo.findOne({where: {id}});
  }

  async create(createPortfolioDto: CreatePortfolioDto, user: User) {
    const createdHistory = await this.portfolioRepo.create({
      DateOfPurchase: createPortfolioDto.dateOfPurchase,
      PurchasePrice: createPortfolioDto.purchasePrice,
      Amount: createPortfolioDto.amount,
    })
    
    createdHistory.user = user;

    //@ts-ignore
    createdHistory.crypto = {
      id:createPortfolioDto.crypto.id,
      name: createPortfolioDto.crypto.name,
    } 

    return await this.portfolioRepo.save(createdHistory)
  }
  
  async update(id: number,updatePortfolioDto: UpdatePortfolioDto, user: User){
    if(!id){
        return null;
    }

    const portfolioToUpdate = {
      DateOfPurchase: updatePortfolioDto.dateOfPurchase,
      PurchasePrice: updatePortfolioDto.purchasePrice,
      Amount: updatePortfolioDto.amount,
      user,
      crypto: updatePortfolioDto.crypto
    }

    return await this.portfolioRepo.update(id,portfolioToUpdate) 
  }
}
