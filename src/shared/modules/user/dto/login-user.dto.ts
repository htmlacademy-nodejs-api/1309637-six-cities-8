import { IsEmail, IsString, Length } from 'class-validator';
import { USER_PASSWORD_LENGTH } from '../../../constants/index.js';

export class LoginUserDTO {
  @IsEmail()
  public email!: string;

  @IsString()
  @Length(USER_PASSWORD_LENGTH.MIN, USER_PASSWORD_LENGTH.MAX)
  public password!: string;
}
