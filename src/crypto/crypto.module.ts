import { Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { CryptoController } from './crypto.controller';
import { User } from '@src/user/entities/user.entity';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Crypto } from './entities/crypto.entity';
import { Portfolio } from '@portfolio/entities/portfolio.entity';
import { PortfolioService } from '@portfolio/portfolio.service';
import { PortfolioController } from './portfolio/portfolio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Crypto,Portfolio,User])],
  controllers: [CryptoController, PortfolioController],
  providers: [CryptoService, PortfolioService],
})
export class CryptoModule {}
