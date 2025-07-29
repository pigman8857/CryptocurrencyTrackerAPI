import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  PrimaryColumn
} from 'typeorm';

import { Portfolio } from '@portfolio/entities/portfolio.entity';

@Entity()
export class Crypto {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Portfolio, (portfolios) => portfolios.crypto)
  portfolios: Portfolio[]
}
