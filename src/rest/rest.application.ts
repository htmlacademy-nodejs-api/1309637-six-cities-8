import { inject, injectable } from 'inversify';

import { ILogger } from '../shared/libs/logger/types/index.js';
import { IConfig, TRestSchema } from '../shared/libs/config/types/index.js';
import { COMPONENT } from '../shared/constants/index.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(COMPONENT.LOGGER) private readonly logger: ILogger,
    @inject(COMPONENT.CONFIG) private readonly config: IConfig<TRestSchema>,
  ) {}

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}
