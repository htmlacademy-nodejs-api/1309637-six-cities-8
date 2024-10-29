import { IsEnum } from 'class-validator';

import { ECity } from '../../../types/index.js';

export class PremiumOfferDTO {
  @IsEnum(ECity)
  public city!: ECity;
}
