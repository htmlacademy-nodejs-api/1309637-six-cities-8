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
  Min,
  Max,
  ValidateNested,
  Length,
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
import { CoordsDTO } from './coords.dto.js';

export class CreateOfferDTO {
  @IsString()
  @Length(OFFER_TITLE_LENGTH.MIN, OFFER_TITLE_LENGTH.MAX)
  public title!: string;

  @IsString()
  @Length(OFFER_DESCRIPTION_LENGTH.MIN, OFFER_DESCRIPTION_LENGTH.MAX)
  public description!: string;

  @IsEnum(ECity)
  public city!: string;

  @IsString()
  public previewImagePath!: string;

  @IsArray()
  @ArrayMinSize(PHOTOS_LENGTH)
  @ArrayMaxSize(PHOTOS_LENGTH)
  public photos!: string[];

  @IsBoolean()
  public isPremium!: boolean;

  @IsEnum(EHousing)
  public housingType!: EHousing;

  @IsInt()
  @Min(ROOMS_NUMBER.MIN)
  @Max(ROOMS_NUMBER.MAX)
  public roomsNumber!: number;

  @IsInt()
  @Min(VISITORS_NUMBER.MIN)
  @Max(VISITORS_NUMBER.MAX)
  public visitorsNumber!: number;

  @IsInt()
  @Min(PRICE.MIN)
  @Max(PRICE.MAX)
  public price!: number;

  @IsArray()
  @ArrayUnique<EFacilities>()
  public facilities!: EFacilities[];

  @IsMongoId()
  public authorId!: string;

  @ValidateNested()
  @IsObject()
  @Type(() => CoordsDTO)
  public coords!: CoordsDTO;
}
