import { defaultClasses, getModelForClass, prop, modelOptions } from '@typegoose/typegoose';

import { EUserType, IUser } from '../../types/index.js';
import { createSHA256 } from '../../helpers/index.js';
import { USER_NAME_LENGTH, USER_PASSWORD_LENGTH } from '../../constants/index.js';

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

  public avatarPath: string;

  @prop({ required: true })
  public name: string;

  @prop({ required: true })
  public type: EUserType;

  @prop({ required: true })
  private password?: string;

  constructor(userData: IUser, password: string, salt: string) {
    super();

    this.email = userData.email;
    this.avatarPath = userData.avatarPath;
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
}

export const UserModel = getModelForClass(UserEntity);
