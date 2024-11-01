import { DocumentType } from '@typegoose/typegoose';

import { CreateOfferDTO, UpdateOfferDTO } from '../index.js';
import { IDocumentExists } from '../../../../rest/types/index.js';
import { OfferEntity } from '../offer.entity.js';
import { ECity } from '../../../types/index.js';

export interface IOfferService extends IDocumentExists {
  create(dto: CreateOfferDTO): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string, userId: string): Promise<DocumentType<OfferEntity> | null>;
  find(count: number, userId: string): Promise<DocumentType<OfferEntity>[]>;
  deleteById(offerId: string, userId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(offerId: string, userId: string, dto: UpdateOfferDTO): Promise<DocumentType<OfferEntity> | null>;
  findPremium(city: ECity, userId: string): Promise<DocumentType<OfferEntity>[]>;
  isOwnOffer(offerId: string, userId: string): Promise<boolean>;
}
