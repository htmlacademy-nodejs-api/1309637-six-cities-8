import { Expose, Transform } from 'class-transformer';
import { EHousing } from '../../../types/index.js';

export class ShortOfferRDO {
  @Expose()
  @Transform((value) => value.obj._id.toString())
  public id!: string;

  @Expose()
  public createdAt!: string;

  @Expose()
  public title!: string;

  @Expose()
  public city!: string;

  @Expose()
  public previewImagePath!: string;

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public isFavorite!: boolean;

  @Expose()
  public housingType!: EHousing;

  @Expose()
  public price!: number;

  @Expose()
  public commentsCount!: number;
}
