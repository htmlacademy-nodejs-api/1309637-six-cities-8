import 'reflect-metadata';
import { Container } from 'inversify';

import { ILogger } from './shared/libs/logger/types/index.js';
import { PinoLogger } from './shared/libs/logger/index.js';
import { RestApplication } from './rest/index.js';
import { RestConfig } from './shared/libs/config/index.js';
import { TRestSchema, IConfig } from './shared/libs/config/types/index.js';
import { EComponent } from './shared/types/index.js';

async function bootstrap() {
  const container = new Container();
  container.bind<RestApplication>(EComponent.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<ILogger>(EComponent.Logger).to(PinoLogger).inSingletonScope();
  container.bind<IConfig<TRestSchema>>(EComponent.Config).to(RestConfig).inSingletonScope();

  const application = container.get<RestApplication>(EComponent.RestApplication);
  await application.init();
}

bootstrap();
