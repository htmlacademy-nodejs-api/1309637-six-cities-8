import {
  IsString,
  MinLength,
  MaxLength,
  IsEnum,
  IsEmail,
  IsOptional,
} from 'class-validator';

import { USER_NAME_LENGTH, USER_PASSWORD_LENGTH } from '../../../constants/index.js';
import { EUserType } from '../../../types/index.js';
import { UserValidationMessage } from './user.message.js';

export class CreateUserDTO {
  @IsEmail({}, { message: UserValidationMessage.email.invalidFormat })
  public email!: string;

  @IsString({ message: UserValidationMessage.name.invalidFormat })
  @MinLength(USER_NAME_LENGTH.MIN, { message: UserValidationMessage.name.minLength })
  @MaxLength(USER_NAME_LENGTH.MAX, { message: UserValidationMessage.name.maxLength })
  public name!: string;

  @IsOptional()
  @IsString({ message: UserValidationMessage.avatarPath.invalidFormat })
  public avatarPath?: string;

  @IsEnum(EUserType, { message: UserValidationMessage.type.invalid })
  public type!: EUserType;

  @IsString({ message: UserValidationMessage.password.invalidFormat })
  @MinLength(USER_PASSWORD_LENGTH.MIN, { message: UserValidationMessage.password.minLength })
  @MaxLength(USER_PASSWORD_LENGTH.MAX, { message: UserValidationMessage.password.maxLength })
  public password!: string;
}
