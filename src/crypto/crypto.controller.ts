import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { CreateCryptoDto } from './dto/create-crypto.dto';
import { ActCryptoDto } from './dto/act-crypto.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { CurrentUser } from 'src/decorators/current-user/current-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}


  @Post('act/:id')
  @UseGuards(AuthGuard)
  action(@Param() id: number,@Body() actCryptoDto: ActCryptoDto, @CurrentUser() user: User){
    console.log('crypto/act/:id > ',id,actCryptoDto,user);
    return "act"
  }

  @Post()
  create(@Body() createCryptoDto: CreateCryptoDto) {
    return this.cryptoService.create(createCryptoDto);
  }

  @Get()
  findAll() {
    return this.cryptoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cryptoService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCryptoDto: UpdateCryptoDto) {
  //   return this.cryptoService.update(+id, updateCryptoDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cryptoService.remove(+id);
  }
}
