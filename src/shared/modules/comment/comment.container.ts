import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';

import { ICommentService } from './types/index.js';
import { COMPONENT } from '../../constants/index.js';
import { DefaultCommentService, CommentEntity, CommentModel } from './index.js';
import { IController } from '../../../rest/types/index.js';
import { CommentController } from './index.js';

export function createCommentContainer() {
  const commentContainer = new Container();
  commentContainer.bind<ICommentService>(COMPONENT.COMMENT_SERVICE).to(DefaultCommentService).inSingletonScope();
  commentContainer.bind<types.ModelType<CommentEntity>>(COMPONENT.COMMENT_MODEL).toConstantValue(CommentModel);
  commentContainer.bind<IController>(COMPONENT.COMMENT_CONTROLLER).to(CommentController).inSingletonScope();

  return commentContainer;
}
