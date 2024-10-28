import { IsMongoId, MinLength, MaxLength, IsString } from 'class-validator';

import { COMMENT_TEXT_LENGTH } from '../../../constants/index.js';
import { CreateCommentValidationMessage } from './create-comment.message.js';

export class CreateCommentDTO {
  @IsString({ message: CreateCommentValidationMessage.text.invalidFormat })
  @MinLength(COMMENT_TEXT_LENGTH.MIN, { message: CreateCommentValidationMessage.text.minLength })
  @MaxLength(COMMENT_TEXT_LENGTH.MAX, { message: CreateCommentValidationMessage.text.maxLength })
  public text!: string;

  @IsMongoId({ message: CreateCommentValidationMessage.authorId.invalid })
  public authorId!: string;
}
