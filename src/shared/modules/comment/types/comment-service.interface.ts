import { DocumentType } from '@typegoose/typegoose';

import { CreateCommentDTO, CommentEntity } from '../index.js';

export interface ICommentService {
  create(dto: CreateCommentDTO, offerId: string): Promise<DocumentType<CommentEntity>>;
  findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]>;
}
