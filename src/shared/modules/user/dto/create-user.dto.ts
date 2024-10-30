import {
  IsString,
  Length,
  IsEnum,
  IsEmail,
  IsOptional,
} from 'class-validator';

import { USER_NAME_LENGTH, USER_PASSWORD_LENGTH } from '../../../constants/index.js';
import { EUserType } from '../../../types/index.js';

export class CreateUserDTO {
  @IsEmail()
  public email!: string;

  @IsString()
  @Length(USER_NAME_LENGTH.MIN, USER_NAME_LENGTH.MAX)
  public name!: string;

  @IsOptional()
  @IsString()
  public avatarPath?: string;

  @IsEnum(EUserType)
  public type!: EUserType;

  @IsString()
  @Length(USER_PASSWORD_LENGTH.MIN, USER_PASSWORD_LENGTH.MAX)
  public password!: string;
}
