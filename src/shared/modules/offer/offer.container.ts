import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';

import { IOfferService } from './types/index.js';
import { COMPONENT } from '../../constants/index.js';
import { DefaultOfferService, OfferEntity, OfferModel } from './index.js';

export function createOfferContainer() {
  const offerContainer = new Container();
  offerContainer.bind<IOfferService>(COMPONENT.OFFER_SERVICE).to(DefaultOfferService).inSingletonScope();
  offerContainer.bind<types.ModelType<OfferEntity>>(COMPONENT.OFFER_MODEL).toConstantValue(OfferModel);

  return offerContainer;
}
