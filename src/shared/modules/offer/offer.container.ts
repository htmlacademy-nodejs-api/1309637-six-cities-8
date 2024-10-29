import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';

import { IOfferService } from './types/index.js';
import { COMPONENT } from '../../constants/index.js';
import { DefaultOfferService } from './index.js';
import { IController } from '../../../rest/types/index.js';
import { OfferController } from './index.js';
import { OfferModel } from '../index.js';
import { OfferEntity } from './offer.entity.js';

export function createOfferContainer() {
  const offerContainer = new Container();
  offerContainer.bind<IOfferService>(COMPONENT.OFFER_SERVICE).to(DefaultOfferService).inSingletonScope();
  offerContainer.bind<types.ModelType<OfferEntity>>(COMPONENT.OFFER_MODEL).toConstantValue(OfferModel);
  offerContainer.bind<IController>(COMPONENT.OFFER_CONTROLLER).to(OfferController).inSingletonScope();

  return offerContainer;
}
