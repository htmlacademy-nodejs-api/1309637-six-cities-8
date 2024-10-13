import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import { IOfferService } from './types/index.js';
import { OfferEntity, CreateOfferDTO, UpdateOfferDTO } from './index.js';
import { COMPONENT, DEFAULT_OFFER_COUNT } from '../../constants/index.js';
import { ILogger } from '../../libs/logger/types/index.js';
import { ESortType } from '../../types/index.js';

@injectable()
export class DefaultOfferService implements IOfferService {
  constructor(
    @inject(COMPONENT.LOGGER) private readonly logger: ILogger,
    @inject(COMPONENT.OFFER_MODEL) private readonly offerModel: types.ModelType<OfferEntity>,
  ) {}

  public async create(dto: CreateOfferDTO): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate('authorId')
      .exec();
  }

  public async find(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count || DEFAULT_OFFER_COUNT;

    return this.offerModel
      .find()
      .sort({ createdDate: ESortType.DESC })
      .limit(limit)
      .populate('authorId')
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDTO): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true });
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }
}
