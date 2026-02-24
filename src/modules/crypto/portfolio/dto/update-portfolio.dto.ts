import { IsNumber } from 'class-validator';
import { CreatePortfolioDto } from './create-portfolio.dto';

export class UpdatePortfolioDto extends CreatePortfolioDto{
  @IsNumber()
  id: number;
}
