import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import { ICommentService } from './types/index.js';
import { CommentEntity, CreateCommentDTO } from './index.js';
import { COMPONENT, DEFAULT_COMMENTS_COUNT } from '../../constants/index.js';
import { ILogger } from '../../libs/logger/types/index.js';
import { ESortType } from '../../types/sort-type.enum.js';

@injectable()
export class DefaultCommentService implements ICommentService {
  constructor(
    @inject(COMPONENT.LOGGER) private readonly logger: ILogger,
    @inject(COMPONENT.COMMENT_MODEL) private readonly commentModel: types.ModelType<CommentEntity>,
  ) {}

  public async create(dto: CreateCommentDTO): Promise<DocumentType<CommentEntity>> {
    const result = await this.commentModel.create(dto);
    this.logger.info(`New comment created: ${dto.text}`);

    return result;
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[] | []> {
    return this.commentModel
      .find({ offerId })
      .sort({ createdDate: ESortType.DESC })
      .limit(DEFAULT_COMMENTS_COUNT)
      .populate('authorId')
      .exec();
  }

  public async deleteByOfferId(offerId: string): Promise<number | null> {
    const result = await this.commentModel
      .deleteMany({ offerId })
      .exec();

    return result.deletedCount;
  }
}
