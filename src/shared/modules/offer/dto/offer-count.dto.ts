import { IsOptional, Min, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

import { MIN_OFFER_COUNT } from '../../../constants/index.js';

export class OfferCountDTO {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(MIN_OFFER_COUNT)
  public count!: number;
}
