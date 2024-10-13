import { DocumentType } from '@typegoose/typegoose';

import { CreateOfferDTO, OfferEntity } from '../index.js';

export interface IOfferService {
  create(dto: CreateOfferDTO): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}
