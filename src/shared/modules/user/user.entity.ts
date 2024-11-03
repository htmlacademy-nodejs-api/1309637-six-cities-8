import {
  defaultClasses,
  prop,
  modelOptions,
  Ref,
} from '@typegoose/typegoose';

import { EUserType, IUser } from '../../types/index.js';
import { createSHA256 } from '../../helpers/index.js';
import { OfferEntity } from '../offer/offer.entity.js';
import { DEFAULT_AVATAR } from '../../constants/index.js';
import { CreateUserDTO } from './index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements IUser {
  @prop({ unique: true, required: true })
  public email: string;

  @prop()
  public avatarPath: string;

  @prop({ required: true })
  public name: string;

  @prop({ required: true })
  public type: EUserType;

  @prop({ required: true })
  private password?: string;

  @prop({
    ref: () => OfferEntity,
    default: [],
  })
  public favorites?: Ref<OfferEntity>[];

  constructor(userData: CreateUserDTO, password: string, salt: string) {
    super();

    this.email = userData.email;
    this.avatarPath = userData.avatarPath || DEFAULT_AVATAR;
    this.name = userData.name;
    this.type = userData.type;

    this.setPassword(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}
