import { PartialType } from '@nestjs/mapped-types';
import { CreateCryptoDto } from './create-crypto.dto';
import { IsString, IsNumber,IsDateString,Contains, Matches} from 'class-validator';

export class PurchaseCryptoDto extends PartialType(CreateCryptoDto) {

  @IsDateString()
  buyTime: Date;

  @IsNumber()
  priceAt: number;

  @IsNumber()
  amount: number;

  @IsString()
  @Matches(/^(buy|sell)$/, { message: 'Type must be either "buy" or "sell"' })
  transactionType: string
}
