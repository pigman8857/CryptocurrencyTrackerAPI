import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {

  //@Type(() => Number) tells NestJS to convert the string query param to a number before validation. Without this, IsPositive and IsNumber will fail

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @IsNumber()
  limit?: number; // Number of items per page

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  offset?: number; // Starting offset
}