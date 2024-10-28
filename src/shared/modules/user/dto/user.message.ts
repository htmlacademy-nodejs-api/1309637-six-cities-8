import { USER_NAME_LENGTH, USER_PASSWORD_LENGTH } from '../../../constants/index.js';

export const UserValidationMessage = {
  email: {
    invalidFormat: 'Email must be a valid email format',
  },
  name: {
    invalidFormat: 'Field name must be a string',
    minLength: `Minimum name length must be ${USER_NAME_LENGTH.MIN}`,
    maxLength: `Maximum name length must be ${USER_NAME_LENGTH.MAX}`,
  },
  avatarPath: {
    invalidFormat: 'Field name must be a string',
  },
  type: {
    invalid: 'Field type must be pro or обычный',
  },
  password: {
    invalidFormat: 'Field password must be a string',
    minLength: `Minimum password length must be ${USER_PASSWORD_LENGTH.MIN}`,
    maxLength: `Maximum password length must be ${USER_PASSWORD_LENGTH.MAX}`,
  }
};
