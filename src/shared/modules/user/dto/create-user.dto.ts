import { EUserType } from '../../../types/index.js';

export class CreateUserDTO {
  public email!: string;
  public name!: string;
  public avatarPath!: string;
  public type!: EUserType;
  public password!: string;
  public favorites?: string[];
}
