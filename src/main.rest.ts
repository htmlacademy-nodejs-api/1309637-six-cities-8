import 'reflect-metadata';
import { Container } from 'inversify';

import { RestApplication, createRestApplicationContainer } from './rest/index.js';
import { COMPONENT } from './shared/constants/index.js';
import { createUserContainer } from './shared/modules/user/index.js';
import { createOfferContainer } from './shared/modules/offer/index.js';

async function bootstrap() {
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer(),
  );

  const application = appContainer.get<RestApplication>(COMPONENT.REST_APPLICATION);
  await application.init();
}

bootstrap();
