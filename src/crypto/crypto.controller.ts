import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { CreateCryptoDto } from './dto/create-crypto.dto';
import { PortfolioService } from '@portfolio/portfolio.service';
import { Serialize } from '@src/interceptors/serialize.interceptor';
import { CryptoDTO } from './dto/crypto.dto';
import { Crypto } from './entities/crypto.entity';
import { UpdateCryptoDto } from './dto/update-crypto.dto';

@Controller('crypto')
export class CryptoController {
  constructor(
    private readonly cryptoService: CryptoService
  ) {}

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
