import { EUserType } from './index.js';

export type TUser = {
  name: string;
  email: string;
  avatarPath: string;
  password: string;
  type: EUserType
}
