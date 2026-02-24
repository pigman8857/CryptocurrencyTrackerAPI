import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  PrimaryColumn,
  Index
} from 'typeorm';

import { Portfolio } from '@portfolio/entities/portfolio.entity';

@Entity()
@Index(["id"],{ unique: true }) 
export class Crypto {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Portfolio, (portfolios) => portfolios.crypto)
  portfolios: Portfolio[]
}
