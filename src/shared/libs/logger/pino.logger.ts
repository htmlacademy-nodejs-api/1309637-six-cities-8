import { Logger, pino, transport } from 'pino';
import { resolve } from 'node:path';
import { injectable } from 'inversify';

import { ILogger, ELogLevel } from './types/index.js';
import { getCurrentModuleDirectoruPath } from '../../helpers/index.js';

const LOG_FILE_PATH = 'logs/rest.log';
const LOG_FILE_DIR_PATH = '../../../';
const FILE_TRANSPORT_TARGET = 'pino/file';

@injectable()
export class PinoLogger implements ILogger {
  private readonly logger: Logger;

  constructor() {
    const modulePath = getCurrentModuleDirectoruPath();
    const destination = resolve(modulePath, LOG_FILE_DIR_PATH, LOG_FILE_PATH);

    const multiTransport = transport({
      targets: [
        {
          target: FILE_TRANSPORT_TARGET,
          options: { destination },
          level: ELogLevel.DEBUG,
        },
        {
          target: FILE_TRANSPORT_TARGET,
          level: ELogLevel.INFO,
        }
      ],
    });

    this.logger = pino({}, multiTransport);
    this.logger.info('Logger created');
  }

  public debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }

  public error(message: string, error: Error, ...args: unknown[]): void {
    this.logger.error(error, message, ...args);
  }

  public info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }
}
