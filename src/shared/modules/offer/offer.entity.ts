import { defaultClasses, getModelForClass, prop, modelOptions, Ref } from '@typegoose/typegoose';

import { EHousing, EFacilities, TCoords } from '../../types/index.js';
import {
  OFFER_TITLE_LENGTH,
  OFFER_DESCRIPTION_LENGTH,
  OFFER_RATING,
  ROOMS_NUMBER,
  VISITORS_NUMBER,
  PRICE,
} from '../../constants/index.js';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    required: true,
    default: '',
    trim: true,
    minlength: OFFER_TITLE_LENGTH.MIN,
    maxlength: OFFER_TITLE_LENGTH.MAX,
  })
  public title!: string;

  @prop({
    required: true,
    default: '',
    trim: true,
    minlength: OFFER_DESCRIPTION_LENGTH.MIN,
    maxlength: OFFER_DESCRIPTION_LENGTH.MAX,
  })
  public description!: string;

  @prop({required: true})
  public createdDate!: Date;

  @prop({ required: true, default: ''})
  public city!: string;

  @prop({ required: true, default: ''})
  public previewImagePath!: string;

  @prop({ required: true, default: []})
  public photos!: string[];

  @prop({ required: true, default: false})
  public isPremium!: boolean;

  @prop({
    required: true,
    default: OFFER_RATING.MIN,
    min: OFFER_RATING.MIN,
    max: OFFER_RATING.MAX,
  })
  public rating!: number;

  @prop({
    required: true,
    type: () => String,
    enum: EHousing,
  })
  public housingType!: EHousing;

  @prop({
    required: true,
    default: ROOMS_NUMBER.MIN,
    min: ROOMS_NUMBER.MIN,
    max: ROOMS_NUMBER.MAX,
  })
  public roomsNumber!: number;

  @prop({
    required: true,
    default: VISITORS_NUMBER.MIN,
    min: VISITORS_NUMBER.MIN,
    max: VISITORS_NUMBER.MAX,
  })
  public visitorsNumber!: number;

  @prop({
    required: true,
    default: PRICE.MIN,
    min: PRICE.MIN,
    max: PRICE.MAX,
  })
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

  @prop({ required: true, default: null })
  public coords!: TCoords;
}

export const OfferModel = getModelForClass(OfferEntity);
