import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@src/guards/auth/auth.guard';
import { PortfolioDTO } from './dto/portfolio.dto';
import { Serialize } from '@src/interceptors/serialize/serialize.interceptor';
import { CurrentUser } from '@src/decorators/current-user/current-user.decorator';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { User } from '@user/entities/user.entity';
import { Portfolio } from './entities/portfolio.entity';
import { PortfolioService } from './portfolio.service';

@Controller('crypto/portfolio')
export class PortfolioController {
  constructor(
    private readonly portfolioService: PortfolioService
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(PortfolioDTO)
  async create(
    @Body() purchaseCryptoDto: CreatePortfolioDto, 
    @CurrentUser() user: User)
    : Promise<Portfolio> {
    return await this.portfolioService.create(purchaseCryptoDto,user);
  }
}
