import { Container } from 'inversify';

import { IAuthService } from './types/index.js';
import { COMPONENT } from '../../constants/index.js';
import { DefualtAuthService, AuthExceptionFilter } from './index.js';
import { IExceptionFilter } from '../../../rest/types/index.js';

export function createAuthContainer() {
  const authContainer = new Container();
  authContainer.bind<IAuthService>(COMPONENT.AUTH_SERVICE).to(DefualtAuthService).inSingletonScope();
  authContainer.bind<IExceptionFilter>(COMPONENT.AUTH_EXCEPTION_FILTER).to(AuthExceptionFilter).inSingletonScope();

  return authContainer;
}
