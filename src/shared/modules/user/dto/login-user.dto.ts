import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { UserValidationMessage } from './user.message.js';
import { USER_PASSWORD_LENGTH } from '../../../constants/index.js';

export class LoginUserDTO {
  @IsEmail({}, { message: UserValidationMessage.email.invalidFormat })
  public email!: string;

  @IsString({ message: UserValidationMessage.password.invalidFormat })
  @MinLength(USER_PASSWORD_LENGTH.MIN, { message: UserValidationMessage.password.minLength })
  @MaxLength(USER_PASSWORD_LENGTH.MAX, { message: UserValidationMessage.password.maxLength })
  public password!: string;
}
