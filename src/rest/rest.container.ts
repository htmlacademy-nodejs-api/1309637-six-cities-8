import { Container } from 'inversify';

import { RestApplication } from './index.js';
import { COMPONENT } from '../shared/constants/index.js';
import { ILogger } from '../shared/libs/logger/types/index.js';
import { PinoLogger } from '../shared/libs/logger/index.js';
import { IConfig, TRestSchema } from '../shared/libs/config/types/index.js';
import { RestConfig } from '../shared/libs/config/index.js';
import { IDatabaseClient } from '../shared/libs/database-client/types/index.js';
import { MongoDatabaseClient } from '../shared/libs/database-client/index.js';

export function createRestApplicationContainer() {
  const restApplicationContainer = new Container();

  restApplicationContainer.bind<RestApplication>(COMPONENT.REST_APPLICATION).to(RestApplication).inSingletonScope();
  restApplicationContainer.bind<ILogger>(COMPONENT.LOGGER).to(PinoLogger).inSingletonScope();
  restApplicationContainer.bind<IConfig<TRestSchema>>(COMPONENT.CONFIG).to(RestConfig).inSingletonScope();
  restApplicationContainer.bind<IDatabaseClient>(COMPONENT.DATABASE_CLIENT).to(MongoDatabaseClient).inSingletonScope();

  return restApplicationContainer;
}
