import { Container } from 'inversify';

import { IUserService } from './types/index.js';
import { COMPONENT } from '../../constants/index.js';
import { DefaultUserService, UserController, UserEntity, UserModel } from './index.js';
import { IController } from '../../../rest/types/index.js';
import { types } from '@typegoose/typegoose';

export function createUserContainer() {
  const userContainer = new Container();
  userContainer.bind<IUserService>(COMPONENT.USER_SERVICE).to(DefaultUserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(COMPONENT.USER_MODEL).toConstantValue(UserModel);
  userContainer.bind<IController>(COMPONENT.USER_CONTROLLER).to(UserController).inSingletonScope();

  return userContainer;
}
