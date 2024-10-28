import { COMMENT_TEXT_LENGTH } from '../../../constants/index.js';

export const CreateCommentValidationMessage = {
  text: {
    invalidFormat: 'Field text must be a string',
    minLength: `Minimum text length must be ${COMMENT_TEXT_LENGTH.MIN}`,
    maxLength: `Maximum text length must be ${COMMENT_TEXT_LENGTH.MAX}`,
  },
  authorId: {
    invalid: 'Field authorId must be a valid MongoDB identifier',
  }
};
