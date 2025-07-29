import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@src/guards/auth.guard';
import { PortfolioDTO } from './dto/portfolio.dto';
import { Serialize } from '@src/interceptors/serialize.interceptor';
import { CurrentUser } from '@src/decorators/current-user.decorator';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { User } from '@user/entities/user.entity';
import { Portfolio } from './entities/portfolio.entity';
import { PortfolioService } from './portfolio.service';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { CheckPortfolioGuard } from './guards/check-portfolio.guard';
import { UpdateResult } from 'typeorm';

@Controller('crypto/portfolio')
@UseGuards(AuthGuard)
export class PortfolioController {
  constructor(
    private readonly portfolioService: PortfolioService
  ) {}


  @Get('/all')
  @Serialize(PortfolioDTO)
  async findAll(@CurrentUser() user: User){
    return await this.portfolioService.findAll(user.id);
  }

  @Post()
  @Serialize(PortfolioDTO)
  async create(
    @Body() createPortfolioDto: CreatePortfolioDto, 
    @CurrentUser() user: User)
    : Promise<Portfolio> {
    return await this.portfolioService.create(createPortfolioDto,user);
  }

  @Get('/:id')
  @Serialize(PortfolioDTO)
  async findOne(@Param('id') id:number,@CurrentUser() user: User){
     return await this.portfolioService.findOneBelongsToUser(user, id);
  }


  @Patch('/:id')
  @UseGuards(CheckPortfolioGuard)
  @Serialize(PortfolioDTO)
  async update(
    @Param('id') id: number,
    @Body() updatePortfolioDto: UpdatePortfolioDto, 
    @CurrentUser() user: User)
    : Promise<UpdateResult> {
    return await this.portfolioService.update(id,updatePortfolioDto,user);
  }


  @Delete('/:id')
  async delete(
    @Param('id') id: number, 
    @CurrentUser() user: User)
    : Promise<Portfolio> {
    return await this.portfolioService.remove(id);
  }

}
