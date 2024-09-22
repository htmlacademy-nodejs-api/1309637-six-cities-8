import convict from 'convict';
import validator from 'convict-format-with-validator';

import { TRestSchema } from './types/index.js';

const Port = {
  DOC: 'Port for incoming connections',
  FORMAT: 'port',
  ENV: 'PORT',
  DEFAULT: 4000,
};

const Salt = {
  DOC: 'Salt for password hash',
  ENV: 'SALT',
};

const DBHost = {
  DOC: 'IP address of the database server (MongoDB)',
  FORMAT: 'ipaddress',
  ENV: 'DB_HOST',
  DEFAULT: '127.0.0.1',
};

convict.addFormats(validator);

export const configRestSchema = convict<TRestSchema>({
  PORT: {
    doc: Port.DOC,
    format: Port.FORMAT,
    env: Port.ENV,
    default: Port.DEFAULT,
  },
  SALT: {
    doc: Salt.DOC,
    format: String,
    env: Salt.ENV,
    default: null,
  },
  DB_HOST: {
    doc: DBHost.DOC,
    format: DBHost.FORMAT,
    env: DBHost.ENV,
    default: DBHost.DEFAULT,
  }
});
