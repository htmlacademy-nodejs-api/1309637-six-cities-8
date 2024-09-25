import 'reflect-metadata';
import { Container } from 'inversify';

import { ILogger } from './shared/libs/logger/types/index.js';
import { PinoLogger } from './shared/libs/logger/index.js';
import { RestApplication } from './rest/index.js';
import { RestConfig } from './shared/libs/config/index.js';
import { TRestSchema, IConfig } from './shared/libs/config/types/index.js';
import { COMPONENT } from './shared/constants/index.js';

async function bootstrap() {
  const container = new Container();
  container.bind<RestApplication>(COMPONENT.REST_APPLICATION).to(RestApplication).inSingletonScope();
  container.bind<ILogger>(COMPONENT.LOGGER).to(PinoLogger).inSingletonScope();
  container.bind<IConfig<TRestSchema>>(COMPONENT.CONFIG).to(RestConfig).inSingletonScope();

  const application = container.get<RestApplication>(COMPONENT.REST_APPLICATION);
  await application.init();
}

bootstrap();
