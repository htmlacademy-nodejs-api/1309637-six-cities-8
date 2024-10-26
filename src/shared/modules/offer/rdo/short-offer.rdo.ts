import { Expose } from 'class-transformer';
import { EHousing } from '../../../types/index.js';

export class ShortOfferRDO {
  @Expose({ name: '_id' })
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

  // TODO
  // @Expose()
  // public isPremium!: boolean;

  @Expose()
  public housingType!: EHousing;

  @Expose()
  public price!: number;

  @Expose()
  public commentsCount!: number;
}
