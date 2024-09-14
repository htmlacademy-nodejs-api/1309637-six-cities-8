import { UserTypeEnum } from './user-type.enum.js';

export type TUser = {
  name: string;
  email: string;
  avatarPath: string;
  password: string;
  type: UserTypeEnum
}
