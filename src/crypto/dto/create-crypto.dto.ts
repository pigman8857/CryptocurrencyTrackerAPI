import { IsString, IsNumber } from 'class-validator';
export class CreateCryptoDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;
}
