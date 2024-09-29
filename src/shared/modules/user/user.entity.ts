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

  @prop({ default: '' })
  public avatarPath: string;

  @prop({
    required: true,
    default: '',
    minlength: USER_NAME_LENGTH.MIN,
    maxlength: USER_NAME_LENGTH.MAX,
  })
  public name: string;

  @prop({ required: true, default: '' })
  public type: EUserType;

  @prop({
    required: true,
    default: '',
    minlength: USER_PASSWORD_LENGTH.MIN,
    maxlength: USER_PASSWORD_LENGTH.MAX,
  })
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
