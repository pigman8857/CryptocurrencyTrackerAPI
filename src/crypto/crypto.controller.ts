import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { CreateCryptoDto } from './dto/create-crypto.dto';
import { ActCryptoDto } from './dto/act-crypto.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { CurrentUser } from 'src/decorators/current-user/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { TransactionHistoryService } from './transaction-history/transaction-history.service';
import { Serialize } from 'src/interceptors/serialize/serialize.interceptor';
import { TransactionHistoryDTO } from './transaction-history/dto/transaction-history.dto';
import { TransactionHistory } from './transaction-history/entities/transaction-history.entity';

@Controller('crypto')
@Serialize(TransactionHistoryDTO)
export class CryptoController {
  constructor(
    private readonly cryptoService: CryptoService, 
    private readonly transHistService: TransactionHistoryService
  ) {}


  @Post('act/:cryptoId')
  @UseGuards(AuthGuard)
  async action(@Param() cryptoId: number,@Body() actCryptoDto: ActCryptoDto, @CurrentUser() user: User): Promise<TransactionHistory> {
    return await this.transHistService.create(actCryptoDto,user);
  }

  @Post()
  async create(@Body() createCryptoDto: CreateCryptoDto) {
    return await this.cryptoService.create(createCryptoDto);
  }

  @Get()
  async findAll() {
    return await this.cryptoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.cryptoService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCryptoDto: UpdateCryptoDto) {
  //   return this.cryptoService.update(+id, updateCryptoDto);
  // }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.cryptoService.remove(+id);
  }
}
