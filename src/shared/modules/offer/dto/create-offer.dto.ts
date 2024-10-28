import {
  IsMongoId,
  IsInt,
  IsString,
  IsEnum,
  IsBoolean,
  IsArray,
  IsObject,
  ArrayUnique,
  ArrayMinSize,
  ArrayMaxSize,
  MinLength,
  MaxLength,
  Min,
  Max,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { EHousing, EFacilities, ECity } from '../../../types/index.js';
import {
  OFFER_TITLE_LENGTH,
  OFFER_DESCRIPTION_LENGTH,
  PHOTOS_LENGTH,
  ROOMS_NUMBER,
  VISITORS_NUMBER,
  PRICE,
} from '../../../constants/index.js';
import { OfferValidationMessage } from './offer.message.js';
import { CoordsDTO } from './coords.dto.js';

export class CreateOfferDTO {
  @IsString({ message: OfferValidationMessage.title.invalidFormat })
  @MinLength(OFFER_TITLE_LENGTH.MIN, { message: OfferValidationMessage.title.minLength })
  @MaxLength(OFFER_TITLE_LENGTH.MAX, { message: OfferValidationMessage.title.maxLength })
  public title!: string;

  @IsString({ message: OfferValidationMessage.description.invalidFormat })
  @MinLength(OFFER_DESCRIPTION_LENGTH.MIN, { message: OfferValidationMessage.description.minLength })
  @MaxLength(OFFER_DESCRIPTION_LENGTH.MAX, { message: OfferValidationMessage.description.maxLength })
  public description!: string;

  @IsEnum(ECity, { message: OfferValidationMessage.city.invalid })
  public city!: string;

  @IsString({ message: OfferValidationMessage.previewImagePath.invalidFormat })
  public previewImagePath!: string;

  @IsArray({ message: OfferValidationMessage.photos.invalidFormat })
  @ArrayMinSize(PHOTOS_LENGTH, { message: OfferValidationMessage.photos.invalidLength })
  @ArrayMaxSize(PHOTOS_LENGTH, { message: OfferValidationMessage.photos.invalidLength })
  public photos!: string[];

  @IsBoolean({ message: OfferValidationMessage.isPremium.invalidFormat })
  public isPremium!: boolean;

  @IsEnum(EHousing, { message: OfferValidationMessage.housingType.invalid })
  public housingType!: EHousing;

  @IsInt({ message: OfferValidationMessage.roomsNumber.invalidFormat })
  @Min(ROOMS_NUMBER.MIN, { message: OfferValidationMessage.roomsNumber.min })
  @Max(ROOMS_NUMBER.MAX, { message: OfferValidationMessage.roomsNumber.max })
  public roomsNumber!: number;

  @IsInt({ message: OfferValidationMessage.visitorsNumber.invalidFormat })
  @Min(VISITORS_NUMBER.MIN, { message: OfferValidationMessage.visitorsNumber.min })
  @Max(VISITORS_NUMBER.MAX, { message: OfferValidationMessage.visitorsNumber.max })
  public visitorsNumber!: number;

  @IsInt({ message: OfferValidationMessage.price.invalidFormat })
  @Min(PRICE.MIN, { message: OfferValidationMessage.price.min })
  @Max(PRICE.MAX, { message: OfferValidationMessage.price.max })
  public price!: number;

  @IsArray({ message: OfferValidationMessage.facilities.invalidFormat })
  @ArrayUnique<EFacilities>({message: OfferValidationMessage.facilities.invalid})
  public facilities!: EFacilities[];

  @IsMongoId({ message: OfferValidationMessage.authorId.invalid })
  public authorId!: string;

  @ValidateNested()
  @IsObject({ message: OfferValidationMessage.coords.invalidFormat })
  @Type(() => CoordsDTO)
  public coords!: CoordsDTO;
}
