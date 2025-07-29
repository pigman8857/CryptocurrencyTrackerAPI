import { CreateCryptoDto } from '@src/crypto/dto/create-crypto.dto';
import { IsNumber,IsDateString, IsObject, ValidateNested} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePortfolioDto {

  @IsObject()
  @ValidateNested() // Validates the nested DTO
  @Type(() => CreateCryptoDto) // Specifies the type for transformation
  crypto: CreateCryptoDto;

  @IsDateString()//ISO 8601 date string YYYY-MM-DDThh:mm:ss.sssZ. Exp: 2025-07-28T10:00:00.000Z
  dateOfPurchase: Date;

  @IsNumber()
  purchasePrice: number;

  @IsNumber()
  amount: number;
}
