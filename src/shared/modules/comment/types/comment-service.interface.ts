import { DocumentType } from '@typegoose/typegoose';

import { CreateCommentDTO } from '../index.js';
import { CommentEntity } from '../comment.entity.js';

export interface ICommentService {
  create(dto: CreateCommentDTO, offerId: string): Promise<DocumentType<CommentEntity>>;
  findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]>;
}
