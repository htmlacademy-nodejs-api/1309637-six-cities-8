import { Expose } from 'class-transformer';

export class UserRDO {
  @Expose()
  public email!: string ;

  @Expose()
  public avatarPath!: string;

  @Expose()
  public name!: string;
}
