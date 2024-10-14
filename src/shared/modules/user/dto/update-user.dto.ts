import { EUserType } from '../../../types/index.js';

export class UpdateUserDTO {
  public email?: string;
  public avatarPath?: string;
  public name?: string;
  public type?: EUserType;
  public password?: string;
}
