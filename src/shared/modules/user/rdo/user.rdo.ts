import { Expose } from 'class-transformer';
import { EUserType } from '../../../types/index.js';

export class UserRDO {
  @Expose()
  public email!: string ;

  @Expose()
  public avatarPath!: string;

  @Expose()
  public name!: string;

  @Expose()
  public type!: EUserType;

  @Expose()
  public favorites!: string[];
}
