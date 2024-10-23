import * as Mongoose from 'mongoose';
import { inject, injectable } from 'inversify';
import { setTimeout } from 'node:timers/promises';

import { IDatabaseClient } from './types/index.js';
import { COMPONENT, DB_CONNECT_RETRY } from '../../constants/index.js';
import { ILogger } from '../logger/types/index.js';

const { ConnectionStates } = Mongoose;

@injectable()
export class MongoDatabaseClient implements IDatabaseClient {
  private mongoose?: typeof Mongoose;

  constructor(
    @inject(COMPONENT.LOGGER) private readonly logger: ILogger,
  ) {}

  public get isConnectedDatabase() {
    if (this.mongoose) {
      return this.mongoose.connection.readyState === ConnectionStates.connected;
    }
    return false;
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnectedDatabase) {
      console.error('MongoDB client already connected');
      return;
    }

    this.logger.info('Trying to connect to MongoDB...');

    let attempt = 0;

    while (attempt < DB_CONNECT_RETRY.COUNT) {
      try {
        this.mongoose = await Mongoose.connect(uri);
        this.logger.info('Database connection established.');
        return;
      } catch (error) {
        attempt++;
        this.logger.error(`Failed to connect to the database. Attempt ${attempt}`, error as Error);
        await setTimeout(DB_CONNECT_RETRY.TIMEOUT);
      }
    }

    throw new Error(`Unable to establish database connection after ${DB_CONNECT_RETRY.COUNT}`);
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnectedDatabase) {
      console.error('Not connected to the database');
      return;
    }

    await this.mongoose?.disconnect?.();
    this.logger.info('Database connection closed.');
  }
}
