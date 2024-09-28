import * as Mongoose from 'mongoose';
import { inject, injectable } from 'inversify';
import { setTimeout } from 'node:timers/promises';

import { IDatabaseClient } from './types/index.js';
import { COMPONENT, DB_CONNECT_RETRY } from '../../constants/index.js';
import { ILogger } from '../logger/types/index.js';

@injectable()
export class MongoDatabaseClient implements IDatabaseClient {
  private mongoose?: typeof Mongoose;
  private isConnected: boolean;

  constructor(
    @inject(COMPONENT.LOGGER) private readonly logger: ILogger,
  ) {
    this.isConnected = false;
  }

  public get isConnectedDatabase() {
    return this.isConnected;
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
        this.isConnected = true;
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
    this.isConnected = false;
    this.logger.info('Database connection closed.');
  }
}
