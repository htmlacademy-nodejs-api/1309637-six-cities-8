import {
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
  Length,
  ValidateNested,
  IsOptional,
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


export class UpdateOfferDTO {
  @IsOptional()
  @IsString()
  @Length(OFFER_TITLE_LENGTH.MIN, OFFER_TITLE_LENGTH.MAX)
  public title?: string;

  @IsOptional()
  @IsString()
  @Length(OFFER_DESCRIPTION_LENGTH.MIN, OFFER_DESCRIPTION_LENGTH.MAX)
  public description?: string;

  @IsOptional()
  @IsEnum(ECity)
  public city?: string;

  @IsOptional()
  @IsString()
  public previewImagePath?: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(PHOTOS_LENGTH)
  @ArrayMaxSize(PHOTOS_LENGTH)
  public photos?: string[];

  @IsOptional()
  @IsBoolean()
  public isPremium?: boolean;

  @IsOptional()
  @IsEnum(EHousing)
  public housingType?: EHousing;

  @IsOptional()
  @IsInt()
  @Min(ROOMS_NUMBER.MIN)
  @Max(ROOMS_NUMBER.MAX)
  public roomsNumber?: number;

  @IsOptional()
  @IsInt()
  @Min(VISITORS_NUMBER.MIN)
  @Max(VISITORS_NUMBER.MAX)
  public visitorsNumber?: number;

  @IsOptional()
  @IsInt()
  @Min(PRICE.MIN)
  @Max(PRICE.MAX)
  public price?: number;

  @IsOptional()
  @IsArray()
  @ArrayUnique<EFacilities>()
  public facilities?: EFacilities[];

  @IsOptional()
  @ValidateNested()
  @IsObject()
  @Type(() => CoordsDTO)
  public coords?: CoordsDTO;
}
