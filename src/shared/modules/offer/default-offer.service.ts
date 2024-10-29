import { DocumentType, types } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { inject, injectable } from 'inversify';

import { IOfferService } from './types/index.js';
import {
  CreateOfferDTO,
  UpdateOfferDTO,
  populateAuthor,
  populateCommentsCount,
} from './index.js';
import { COMPONENT, DEFAULT_OFFER_COUNT } from '../../constants/index.js';
import { ILogger } from '../../libs/logger/types/index.js';
import { ESortType } from '../../types/index.js';
import { OfferEntity } from './offer.entity.js';

// const MOCK_USER = '66f947e7e706754fb39b93a7';

@injectable()
export class DefaultOfferService implements IOfferService {
  constructor(
    @inject(COMPONENT.LOGGER) private readonly logger: ILogger,
    @inject(COMPONENT.OFFER_MODEL) private readonly offerModel: types.ModelType<OfferEntity>,
  ) {}

  public async exists(documentId: string): Promise<boolean> {
    return this.offerModel
      .exists({_id: documentId}).then(((resolve) => !!resolve));
  }

  public async create(dto: CreateOfferDTO): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const result = await this.offerModel
      .aggregate([
        { $match: { '_id': new Types.ObjectId(offerId) } },
        ...populateCommentsCount,
        ...populateAuthor,
        // {
        //   $lookup: {
        //     from: 'users',
        //     pipeline: [
        //       { $match: { '_id': new Types.ObjectId(MOCK_USER) } },
        //       { $project: { favorites: 1 } }
        //     ],
        //     as: 'currentUser'
        //   },
        // },
        // { $unwind: '$currentUser' },
      ])
      .exec();

    // if (result[0]) {
    //   const offer = result[0];

    //   offer.isFavorite = offer.currentUser.favorites
    //     .map((f: ObjectId) => f.toString()).includes(offerId);
    //   delete offer.currentUser;

    //   return offer;
    // }

    return result[0] || null;
  }

  public async find(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count || DEFAULT_OFFER_COUNT;

    return this.offerModel
      .aggregate([
        ...populateCommentsCount,
        { $sort: { createdAt: ESortType.DESC } },
        { $limit: limit },
      ])
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
