import {
  defaultClasses,
  prop,
  modelOptions,
  Ref,
  Severity,
} from '@typegoose/typegoose';

import { EHousing, EFacilities, TCoords } from '../../types/index.js';
import { UserEntity } from '../user/user.entity.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ required: true })
  public title!: string;

  @prop({ required: true })
  public description!: string;

  @prop({ required: true })
  public city!: string;

  @prop({ required: true })
  public previewImagePath!: string;

  @prop({ required: true })
  public photos!: string[];

  @prop({ required: true })
  public isPremium!: boolean;

  @prop({
    required: true,
    type: () => String,
    enum: EHousing,
  })
  public housingType!: EHousing;

  @prop({ required: true })
  public roomsNumber!: number;

  @prop({ required: true })
  public visitorsNumber!: number;

  @prop({ required: true })
  public price!: number;

  @prop({
    required: true,
    type: () => String,
    enum: EFacilities,
  })
  public facilities!: EFacilities[];

  @prop({
    required: true,
    ref: () => UserEntity,
  })
  public authorId!: Ref<UserEntity>;

  @prop({ required: true })
  public coords!: TCoords;
}
