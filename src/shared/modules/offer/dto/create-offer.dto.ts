import { EHousing, EFacilities, TCoords } from '../../../types/index.js';

export class CreateOfferDto {
  public title!: string;
  public description!: string;
  public createdDate!: Date;
  public city!: string;
  public previewImagePath!: string;
  public photos!: string[];
  public isPremium!: boolean;
  public rating!: number;
  public housingType!: EHousing;
  public roomsNumber!: number;
  public visitorsNumber!: number;
  public price!: number;
  public facilities!: EFacilities[];
  public authorId!: string;
  public coords!: TCoords;
}
