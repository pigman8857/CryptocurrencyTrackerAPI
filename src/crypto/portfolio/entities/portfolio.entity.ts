import { Column,Entity,PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Crypto } from '../../entities/crypto.entity';
import { User } from 'src/user/entities/user.entity';

export type TransactionType = 'buy' | 'sell';

@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.portfolios)
  user: User;

  @ManyToOne(() => Crypto, (crypto) => crypto.portfolios)
  crypto: Crypto;

  @Column('decimal', { precision: 20, scale: 8 })
  PurchasePrice: number;

  @Column('decimal', { precision: 20, scale: 8 })
  Amount: number;

  @Column()
  DateOfPurchase: Date;
}
