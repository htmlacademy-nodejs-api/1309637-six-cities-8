import * as Mongoose from 'mongoose';
import { inject, injectable } from 'inversify';

import { IDatabaseClient } from './types/index.js';
import { COMPONENT } from '../../constants/index.js';
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

    this.mongoose = await Mongoose.connect(uri);

    this.isConnected = true;

    this.logger.info('Database connection established.');
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
