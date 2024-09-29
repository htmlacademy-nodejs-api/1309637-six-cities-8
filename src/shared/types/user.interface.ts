import { EUserType } from './index.js';

export interface IUser {
  name: string;
  email: string;
  avatarPath: string;
  type: EUserType
}
