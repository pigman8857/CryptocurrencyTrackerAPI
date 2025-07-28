import { Column,Entity,PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Crypto } from '../../entities/crypto.entity';
import { User } from 'src/user/entities/user.entity';

export type TransactionType = 'buy' | 'sell';

@Entity()
export class TransactionHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.transactionHistories)
  user: User;

  @ManyToOne(() => Crypto, (crypto) => crypto.transactionHistories)
  crypto: Crypto;

  @Column('decimal', { precision: 20, scale: 8 })
  PriceAt: number;

  @Column('decimal', { precision: 20, scale: 8 })
  Amount: number;

  @Column()
  PriceTimeDate: Date;

  @Column()
  transactionType: TransactionType;
}
