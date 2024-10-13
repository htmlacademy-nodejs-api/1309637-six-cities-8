import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import { ICommentService } from './types/index.js';
import { CommentEntity, CreateCommentDTO } from './index.js';
import { COMPONENT } from '../../constants/index.js';
import { ILogger } from '../../libs/logger/types/index.js';

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
    return this.commentModel.find({ offerId }).populate('authorId').exec();
  }
}
