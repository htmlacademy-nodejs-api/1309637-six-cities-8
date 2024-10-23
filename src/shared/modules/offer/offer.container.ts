import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';

import { IOfferService } from './types/index.js';
import { COMPONENT } from '../../constants/index.js';
import { DefaultOfferService, OfferEntity, OfferModel } from './index.js';
import { IController } from '../../../rest/types/index.js';
import { OfferController } from './index.js';

export function createOfferContainer() {
  const offerContainer = new Container();
  offerContainer.bind<IOfferService>(COMPONENT.OFFER_SERVICE).to(DefaultOfferService).inSingletonScope();
  offerContainer.bind<types.ModelType<OfferEntity>>(COMPONENT.OFFER_MODEL).toConstantValue(OfferModel);
  offerContainer.bind<IController>(COMPONENT.OFFER_CONTROLLER).to(OfferController).inSingletonScope();

  return offerContainer;
}
