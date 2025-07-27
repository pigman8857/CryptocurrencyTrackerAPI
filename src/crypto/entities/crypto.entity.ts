import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm';

import { TransactionHistory } from './transaction-history.entity';

@Entity()
export class Crypto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => TransactionHistory, (transactionHistories) => transactionHistories.crypto)
  transactionHistories: TransactionHistory
}
