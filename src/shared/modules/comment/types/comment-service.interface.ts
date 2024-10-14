import { DocumentType } from '@typegoose/typegoose';

import { CreateCommentDTO, CommentEntity, UpdateCommentDTO } from '../index.js';

export interface ICommentService {
  create(dto: CreateCommentDTO): Promise<DocumentType<CommentEntity>>;
  findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]>;
  updateRating(offerId: string, dto: UpdateCommentDTO): Promise<DocumentType<CommentEntity> | null>;
}
