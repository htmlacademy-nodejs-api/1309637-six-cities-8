import { inject, injectable } from 'inversify';

import { ILogger } from '../shared/libs/logger/types/index.js';
import { IConfig, TRestSchema } from '../shared/libs/config/types/index.js';
import { EComponent } from '../shared/types/component.enum.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(EComponent.Logger) private readonly logger: ILogger,
    @inject(EComponent.Config) private readonly config: IConfig<TRestSchema>,
  ) {}

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}
