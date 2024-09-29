import { defaultClasses, getModelForClass, prop, modelOptions } from '@typegoose/typegoose';

import { EUserType, IUser } from '../../types/index.js';
import { createSHA256 } from '../../helpers/index.js';

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

  @prop({ unique: false, default: '' })
  public avatarPath: string;

  @prop({ required: true, default: '' })
  public name: string;

  @prop({ required: true, default: '' })
  public type: EUserType;

  @prop({ required: true, default: '' })
  private password?: string;

  constructor(userData: IUser) {
    super();

    this.email = userData.email;
    this.avatarPath = userData.avatarPath;
    this.name = userData.name;
    this.type = userData.type;
  }

  public getPassword() {
    return this.password;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }
}

export const UserModel = getModelForClass(UserEntity);
