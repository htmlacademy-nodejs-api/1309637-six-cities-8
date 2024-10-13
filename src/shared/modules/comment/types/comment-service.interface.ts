import { DocumentType } from '@typegoose/typegoose';

import { CreateCommentDTO, CommentEntity } from '../index.js';

export interface ICommentService {
  create(dto: CreateCommentDTO): Promise<DocumentType<CommentEntity>>;
  findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]>;
  deleteByOfferId(offerId: string): Promise<number | null>;
}
