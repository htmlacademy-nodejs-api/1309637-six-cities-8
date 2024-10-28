import { Expose, Transform } from 'class-transformer';
import { EUserType } from '../../../types/index.js';
import { ObjectId } from 'mongoose';

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
  @Transform((value) => value.obj.favorites.map((f: ObjectId) => f.toString()))
  public favorites!: string[];
}
