import { Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { CryptoController } from './crypto.controller';
import { User } from '@src/user/entities/user.entity';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Crypto } from './entities/crypto.entity';
import { TransactionHistory } from './transaction-history/entities/transaction-history.entity';
import { TransactionHistoryService } from './transaction-history/transaction-history.service';

@Module({
  imports: [TypeOrmModule.forFeature([Crypto,TransactionHistory,User])],
  controllers: [CryptoController],
  providers: [CryptoService, TransactionHistoryService],
})
export class CryptoModule {}
