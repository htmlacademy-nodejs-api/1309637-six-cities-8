import { Expose } from 'class-transformer';
import { EFacilities, EHousing, TCoords } from '../../../types/index.js';

export class OfferRDO {
  @Expose()
  public _id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public city!: string;

  @Expose()
  public previewImagePath!: string;

  @Expose()
  public photos!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public housingType!: EHousing;

  @Expose()
  public roomsNumber!: number;

  @Expose()
  public visitorsNumber!: number;

  @Expose()
  public price!: number;

  @Expose()
  public facilities!: EFacilities;

  @Expose()
  public coords!: TCoords;

  @Expose()
  public author!: unknown;
}
