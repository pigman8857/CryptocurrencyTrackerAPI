import { Column,Entity,PrimaryGeneratedColumn, ManyToOne, Index } from 'typeorm';
import { Crypto } from '@crypto/entities/crypto.entity';
import { User } from 'src/user/entities/user.entity';

export type TransactionType = 'buy' | 'sell';

@Entity()
@Index(["id"],{ unique: true }) // For searching by portfolio Id. This help speeding up PortfolioService.findOne
@Index(["user"]) // For searching portfolio that belong to a certain user. This should help speeding up PortfolioService.findAll
@Index(["id","user"],{ unique: true }) // For searching portfolio with user and id. This will help with PortfolioService.findOneBelongsToUser
export class Portfolio {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.portfolios)
  user: User;

  @ManyToOne(() => Crypto, (crypto) => crypto.portfolios)
  crypto: Crypto;

  @Column('decimal', { precision: 20, scale: 8 })
  purchasePrice: number;

  @Column('decimal', { precision: 20, scale: 8 })
  amount: number;

  @Column()
  dateOfPurchase: Date;
}
