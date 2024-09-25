export const RADIX = 10;

export const Price = {
  MIN: 100,
  MAX: 100000,
};

export const RoomsNumber = {
  MIN: 1,
  MAX: 8,
};

export const VisitorsNumber = {
  MIN: 1,
  MAX: 10,
};

export const Rating = {
  MIN: 1,
  MAX: 5,
  MAX_NUM_AFTER_DIGIT: 1,
};

export const WeekDay = {
  FIRST: 1,
  LAST: 7,
};

export const MockCommentsNumber = {
  MIN: 0,
  MAX: 10,
};

export const CHUNK_SIZE = 16384;
export const LOG_FILE_PATH = 'logs/rest.log';
export const FILE_TRANSPORT_TARGET = 'pino/file';

export const COMPONENT = {
  REST_APPLICATION: Symbol.for('RestApplication'),
  LOGGER: Symbol.for('Logger'),
  CONFIG: Symbol.for('Config'),
};
