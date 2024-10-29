import { IsMongoId, IsString, IsInt, Min, Max, Length } from 'class-validator';

import { COMMENT_RATING, COMMENT_TEXT_LENGTH } from '../../../constants/index.js';

export class CreateCommentDTO {
  @IsString()
  @Length(COMMENT_TEXT_LENGTH.MIN, COMMENT_TEXT_LENGTH.MAX)
  public text!: string;

  @IsMongoId()
  public authorId!: string;

  @IsInt()
  @Min(COMMENT_RATING.MIN)
  @Max(COMMENT_RATING.MAX)
  public rating!: number;
}
