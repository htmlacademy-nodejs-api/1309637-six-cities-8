import { inject, injectable } from 'inversify';

import { ILogger } from '../shared/libs/logger/types/index.js';
import { IConfig, TRestSchema } from '../shared/libs/config/types/index.js';
import { COMPONENT } from '../shared/constants/index.js';
import { IDatabaseClient } from '../shared/libs/database-client/types/index.js';
import { getMongoURI } from '../shared/helpers/index.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(COMPONENT.LOGGER) private readonly logger: ILogger,
    @inject(COMPONENT.CONFIG) private readonly config: IConfig<TRestSchema>,
    @inject(COMPONENT.DATABASE_CLIENT) private readonly databaseClient: IDatabaseClient,
  ) {}

  private async initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    return await this.databaseClient.connect(mongoUri);
  }

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    this.logger.info('Init database...');
    await this.initDb();
    this.logger.info('Init database completed');
  }
}
