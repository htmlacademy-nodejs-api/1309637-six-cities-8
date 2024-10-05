import { Container } from 'inversify';

import { IUserService } from './types/index.js';
import { COMPONENT } from '../../constants/index.js';
import { DefaultUserService } from './index.js';

export function createUserContainer() {
  const userContainer = new Container();
  userContainer.bind<IUserService>(COMPONENT.USER_SERVICE).to(DefaultUserService).inSingletonScope();

  return userContainer;
}
