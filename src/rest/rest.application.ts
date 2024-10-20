import { inject, injectable } from 'inversify';
import express, { Express } from 'express';

import { ILogger } from '../shared/libs/logger/types/index.js';
import { IConfig, TRestSchema } from '../shared/libs/config/types/index.js';
import { COMPONENT } from '../shared/constants/index.js';
import { IDatabaseClient } from '../shared/libs/database-client/types/index.js';
import { getMongoURI } from '../shared/helpers/index.js';
import { IController, IExceptionFilter } from './types/index.js';

@injectable()
export class RestApplication {
  private readonly server: Express;

  constructor(
    @inject(COMPONENT.LOGGER) private readonly logger: ILogger,
    @inject(COMPONENT.CONFIG) private readonly config: IConfig<TRestSchema>,
    @inject(COMPONENT.DATABASE_CLIENT) private readonly databaseClient: IDatabaseClient,
    @inject(COMPONENT.OFFER_CONTROLLER) private readonly offerController: IController,
    @inject(COMPONENT.USER_CONTROLLER) private readonly userController: IController,
    @inject(COMPONENT.EXCEPTION_FILTER) private readonly appExceptionFilter: IExceptionFilter,
  ) {
    this.server = express();
  }

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

  private async initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }

  private async initControllers() {
    this.server.use('/offers', this.offerController.router);
    this.server.use('/users', this.userController.router);
  }

  private initMiddleware() {
    this.server.use(express.json());
  }

  private initExceptionFilters() {
    this.server.use(this.appExceptionFilter.catch.bind(this.appExceptionFilter));
  }

  public async init() {
    this.logger.info('Application initialization');

    this.logger.info('Init database...');
    await this.initDb();
    this.logger.info('Init database completed');

    this.logger.info('Init app-level middleware');
    await this.initMiddleware();
    this.logger.info('App-level middleware initialization completed');

    this.logger.info('Init controllers');
    await this.initControllers();
    this.logger.info('Controller initialization completed');

    this.logger.info('Init exception filters');
    await this.initExceptionFilters();
    this.logger.info('Exception filters initialization compleated');

    this.logger.info('Try to init server...');
    await this.initServer();
    this.logger.info(`Server started on http://localhost:${this.config.get('PORT')}`);
  }
}
