import { BadRequestException, Injectable } from '@nestjs/common';
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

  async findOneBelongsToUser(user: User,id: number): Promise<Portfolio>{
    if(!id || !user || !user.id){
      return null;
    }

    return this.portfolioRepo.findOne(
      {where: {
        id , 
        user: { 
          id: user.id
        }},
      relations:['crypto','user']});
  }

  async findAll(userId: number): Promise<Portfolio[]>{
    if(!userId){
      return null;
    }

    return await this.portfolioRepo.find({
      relations: ['crypto'],
      where: { user : { id:userId }},
    })
  }

  async create(createPortfolioDto: CreatePortfolioDto, user: User) {
    const createdHistory = await this.portfolioRepo.create({
      dateOfPurchase: createPortfolioDto.dateOfPurchase,
      purchasePrice: createPortfolioDto.purchasePrice,
      amount: createPortfolioDto.amount,
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

    //@ts-ignore
    const portfolioToUpdate: Portfolio = {
      dateOfPurchase: updatePortfolioDto.dateOfPurchase,
      purchasePrice: updatePortfolioDto.purchasePrice,
      amount: updatePortfolioDto.amount,
      user,
      //@ts-ignore
      crypto: { id: updatePortfolioDto.crypto.id }
    }

    return await this.portfolioRepo.update(id,portfolioToUpdate) 
  }

  async remove(id: number): Promise<Portfolio>{
    if(!id){
      return null;
    }

    const portfoliotoBeDeleted = await this.findOne(id);
    if(!portfoliotoBeDeleted){
        throw new BadRequestException('The portfolio not found');
    }

     return await this.portfolioRepo.remove(portfoliotoBeDeleted) 
  }

}
