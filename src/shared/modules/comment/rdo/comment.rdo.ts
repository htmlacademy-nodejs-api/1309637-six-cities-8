import { Expose, Type, Transform } from 'class-transformer';
import { UserRDO } from '../../user/index.js';

export class CommentRDO {
  @Expose({ name: '_id' })
  @Transform((value) => value.obj._id.toString())
  public id!: string;

  @Expose()
  @Transform((value) => value.obj.offerId.toString())
  public offerId!: string;

  @Expose()
  public text!: string;

  @Expose()
  public createdAt!: Date;

  @Expose()
  public rating!: number;

  @Expose()
  @Type(() => UserRDO)
  public author!: UserRDO;
}
