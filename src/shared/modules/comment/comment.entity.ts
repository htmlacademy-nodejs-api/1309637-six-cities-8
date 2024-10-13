import {
  defaultClasses,
  getModelForClass,
  prop,
  modelOptions,
  Ref,
  Severity
} from '@typegoose/typegoose';

import { UserEntity } from '../user/index.js';
import { OfferEntity } from '../offer/index.js';

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

  public rating!: number;

  @prop({ required: true})
  public createdDate!: Date;

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

export const CommentModel = getModelForClass(CommentEntity);
