export const RADIX = 10;

export const PRICE = {
  MIN: 100,
  MAX: 100000,
};

export const ROOMS_NUMBER = {
  MIN: 1,
  MAX: 8,
};

export const VISITORS_NUMBER = {
  MIN: 1,
  MAX: 10,
};

export const RATING = {
  MIN: 1,
  MAX: 5,
  MAX_NUM_AFTER_DIGIT: 1,
};

export const WEEK_DAY = {
  FIRST: 1,
  LAST: 7,
};

export const MOCK_COMMENTS_NUMBER = {
  MIN: 0,
  MAX: 10,
};

export const CHUNK_SIZE = 16384;
export const LOG_FILE_PATH = 'logs/rest.log';
export const FILE_TRANSPORT_TARGET = 'pino/file';

export const DB_CONNECT_RETRY = {
  COUNT: 5,
  TIMEOUT: 1000,
};

export const COMPONENT = {
  REST_APPLICATION: Symbol.for('RestApplication'),
  LOGGER: Symbol.for('Logger'),
  CONFIG: Symbol.for('Config'),
  DATABASE_CLIENT: Symbol.for('DatabaseClient'),
};
