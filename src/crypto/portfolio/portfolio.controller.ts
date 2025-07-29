import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@src/guards/auth/auth.guard';
import { PortfolioDTO } from './dto/portfolio.dto';
import { Serialize } from '@src/interceptors/serialize/serialize.interceptor';
import { CurrentUser } from '@src/decorators/current-user/current-user.decorator';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { User } from '@user/entities/user.entity';
import { Portfolio } from './entities/portfolio.entity';
import { PortfolioService } from './portfolio.service';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { CheckPortfolioGuard } from './guards/check-portfolio.guard';

@Controller('crypto/portfolio')
export class PortfolioController {
  constructor(
    private readonly portfolioService: PortfolioService
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(PortfolioDTO)
  async create(
    @Body() createPortfolioDto: CreatePortfolioDto, 
    @CurrentUser() user: User)
    : Promise<Portfolio> {
    return await this.portfolioService.create(createPortfolioDto,user);
  }

  @Patch('/:portfolioId')
  @UseGuards(AuthGuard,CheckPortfolioGuard)
  @Serialize(PortfolioDTO)
  async update(
    @Param() portfolioId: number,
    @Body() updatePortfolioDto: UpdatePortfolioDto, 
    @CurrentUser() user: User)
    : Promise<Portfolio> {
    console.log('patch portfolio controller',updatePortfolioDto, user);
    return null; //await this.portfolioService.update(portfolioId,createPortfolioDto,user);
  }
}
