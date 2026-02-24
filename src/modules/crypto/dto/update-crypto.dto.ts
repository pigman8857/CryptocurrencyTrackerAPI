
import { IsString } from 'class-validator'

export class UpdateCryptoDto{
  @IsString()
  name: string;
}