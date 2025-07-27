import { Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { CryptoController } from './crypto.controller';
import { User } from 'src/user/entities/user.entity';
import { TransactionHistory } from './entities/transaction-history.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Crypto,TransactionHistory,User])],
  controllers: [CryptoController],
  providers: [CryptoService],
})
export class CryptoModule {}
