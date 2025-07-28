import { CreateCryptoDto } from './create-crypto.dto';
import { IsString, IsNumber,IsDateString, Matches, IsObject, ValidateNested} from 'class-validator';
import { Type } from 'class-transformer';

export class ActCryptoDto {

  @IsObject()
  @ValidateNested() // Validates the nested DTO
  @Type(() => CreateCryptoDto) // Specifies the type for transformation
  crypto: CreateCryptoDto;

  @IsDateString()//ISO 8601 date string YYYY-MM-DDThh:mm:ss.sssZ. Exp: 2025-07-28T10:00:00.000Z
  buyTime: Date;

  @IsNumber()
  priceAt: number;

  @IsNumber()
  amount: number;

  @IsString()
  @Matches(/^(buy|sell)$/,{ message: 'Type must be either "buy" or "sell"' })
  transactionType: string
}
