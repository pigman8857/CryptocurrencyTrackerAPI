import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { CreateCryptoDto } from './dto/create-crypto.dto';
import { PurchaseCryptoDto } from './dto/purchase-crypto.dto';
import { AuthGuard } from '@src/guards/auth/auth.guard';
import { CurrentUser } from 'src/decorators/current-user/current-user.decorator';
import { User } from '@user/entities/user.entity';
import { PortfolioService } from '@portfolio/portfolio.service';
import { Serialize } from '@src/interceptors/serialize/serialize.interceptor';
import { PortfolioDTO } from '@portfolio/dto/portfolio.dto';
import { Portfolio } from '@portfolio/entities/portfolio.entity';
import { CryptoDTO } from './dto/crypto.dto';
import { Crypto } from './entities/crypto.entity';
import { UpdateCryptoDto } from './dto/update-crypto.dto';

@Controller('crypto')
export class CryptoController {
  constructor(
    private readonly cryptoService: CryptoService, 
    private readonly portfolioService: PortfolioService
  ) {}


  @Post('act/:cryptoId')
  @UseGuards(AuthGuard)
  @Serialize(PortfolioDTO)
  async action(
    @Param() cryptoId: number,
    @Body() purchaseCryptoDto: PurchaseCryptoDto, 
    @CurrentUser() user: User)
    : Promise<Portfolio> {
    return await this.portfolioService.create(purchaseCryptoDto,user);
  }

  @Post()
  @Serialize(CryptoDTO)
  async create(@Body() createCryptoDto: CreateCryptoDto): Promise<Crypto> {
    return await this.cryptoService.create(createCryptoDto);
  }

  @Get()
  @Serialize(CryptoDTO)
  async findAll(): Promise<Crypto[]>{
    return await this.cryptoService.findAll();
  }

  @Get(':id')
  @Serialize(CryptoDTO)
  async findOne(@Param('id') id: string): Promise<Crypto>  {
    return await this.cryptoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCryptoDto: UpdateCryptoDto) {
    return this.cryptoService.update(+id, updateCryptoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Crypto> {
    return await this.cryptoService.remove(+id);
  }
}
