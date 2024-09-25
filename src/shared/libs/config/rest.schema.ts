import convict from 'convict';
import validator from 'convict-format-with-validator';

import { TRestSchema } from './types/index.js';

convict.addFormats(validator);

export const configRestSchema = convict<TRestSchema>({
  PORT: {
    doc: '',
    format: '',
    env: '',
    default: 0,
  },
  SALT: {
    doc: '',
    format: '',
    env: '',
    default: null,
  },
  DB_HOST: {
    doc: '',
    format: '',
    env: '',
    default: ''
  }
});
