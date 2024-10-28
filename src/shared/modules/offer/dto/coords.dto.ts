import { IsInt } from 'class-validator';
import { OfferValidationMessage } from './offer.message.js';

export class CoordsDTO {
  @IsInt({ message: OfferValidationMessage.coords.latitude.invalidFormat })
  public latitude!: number;

  @IsInt({ message: OfferValidationMessage.coords.longitude.invalidFormat })
  public longitude!: number;
}
