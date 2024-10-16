import { EHousing, EFacilities, TCoords } from '../../../types/index.js';

export class CreateOfferDTO {
  public title!: string;
  public description!: string;
  public city!: string;
  public previewImagePath!: string;
  public photos!: string[];
  public isPremium!: boolean;
  public housingType!: EHousing;
  public roomsNumber!: number;
  public visitorsNumber!: number;
  public price!: number;
  public facilities!: EFacilities[];
  public authorId!: string;
  public coords!: TCoords;
}
