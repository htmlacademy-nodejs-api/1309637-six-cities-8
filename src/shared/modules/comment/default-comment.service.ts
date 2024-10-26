import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { Types } from 'mongoose';

import { ICommentService } from './types/index.js';
import { CommentEntity, CreateCommentDTO } from './index.js';
import { COMMENT_RATING, COMPONENT, DEFAULT_COMMENTS_COUNT } from '../../constants/index.js';
import { ILogger } from '../../libs/logger/types/index.js';
import { ESortType } from '../../types/sort-type.enum.js';
import { getRandomNumber } from '../../helpers/index.js';

@injectable()
export class DefaultCommentService implements ICommentService {
  constructor(
    @inject(COMPONENT.LOGGER) private readonly logger: ILogger,
    @inject(COMPONENT.COMMENT_MODEL) private readonly commentModel: types.ModelType<CommentEntity>,
  ) {}

  public async create(dto: CreateCommentDTO, offerId: string): Promise<DocumentType<CommentEntity>> {
    console.log(dto);
    const result = await this.commentModel.create({
      ...dto,
      offerId,
      rating: getRandomNumber(COMMENT_RATING.MIN, COMMENT_RATING.MAX),
    });
    this.logger.info(`New comment created: ${dto.text}`);

    return result;
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[] | []> {
    return this.commentModel
      .aggregate([
        { $match: {
          offerId: new Types.ObjectId(offerId),
        }},
        {
          $lookup: {
            from: 'users',
            localField: 'authorId',
            foreignField: '_id',
            as: 'author',
          },
        },
        { $unwind: '$author' },
        { $limit:  DEFAULT_COMMENTS_COUNT },
        { $sort: { createdDate: ESortType.DESC } }
      ])
      .exec();
  }
}
