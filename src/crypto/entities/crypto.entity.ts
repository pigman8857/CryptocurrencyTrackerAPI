import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  PrimaryColumn
} from 'typeorm';

import { TransactionHistory } from '../transaction-history/entities/transaction-history.entity';

@Entity()
export class Crypto {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => TransactionHistory, (transactionHistories) => transactionHistories.crypto)
  transactionHistories: TransactionHistory
}
