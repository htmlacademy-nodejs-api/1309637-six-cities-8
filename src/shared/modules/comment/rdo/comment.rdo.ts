import { Types } from 'mongoose';
import { Expose, Type } from 'class-transformer';
import { UserRDO } from '../../user/index.js';

export class CommentRDO {
  @Expose({ name: '_id' })
  public id!: Types.ObjectId;

  @Expose()
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
