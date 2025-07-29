import { Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { CryptoController } from './crypto.controller';
import { User } from '@src/user/entities/user.entity';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Crypto } from './entities/crypto.entity';
import { Portfolio } from '@portfolio/entities/portfolio.entity';
import { PortfolioService } from '@portfolio/portfolio.service';

@Module({
  imports: [TypeOrmModule.forFeature([Crypto,Portfolio,User])],
  controllers: [CryptoController],
  providers: [CryptoService, PortfolioService],
})
export class CryptoModule {}
