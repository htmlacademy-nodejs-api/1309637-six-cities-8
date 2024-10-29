import {
  defaultClasses,
  prop,
  modelOptions,
  Ref,
  Severity
} from '@typegoose/typegoose';

import { UserEntity } from '../user/user.entity.js';
import { OfferEntity } from '../offer/offer.entity.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments',
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({ required: true })
  public text!: string;

  @prop({ required: true })
  public rating!: number;

  @prop({
    required: true,
    ref: () => UserEntity,
  })
  public authorId!: Ref<UserEntity>;

  @prop({
    required: true,
    ref: () => OfferEntity,
  })
  public offerId!: Ref<OfferEntity>;
}
