import { DocumentType } from '@typegoose/typegoose';

import { CreateOfferDTO, UpdateOfferDTO } from '../index.js';
import { IDocumentExists } from '../../../../rest/types/index.js';
import { OfferEntity } from '../offer.entity.js';
import { ECity } from '../../../types/index.js';

export interface IOfferService extends IDocumentExists {
  create(dto: CreateOfferDTO): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  find(count?: number): Promise<DocumentType<OfferEntity>[]>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(offerId: string, dto: UpdateOfferDTO): Promise<DocumentType<OfferEntity> | null>;
  findPremium(city: ECity): Promise<DocumentType<OfferEntity>[]>;
}
