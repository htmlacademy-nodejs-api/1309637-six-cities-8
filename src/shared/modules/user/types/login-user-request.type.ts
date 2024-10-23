import { Request } from 'express';

import { TRequestBody, TRequestParams } from '../../../../rest/types/index.js';
import { LoginUserDTO } from '../index.js';

export type TLoginUserRequest = Request<TRequestParams, TRequestBody, LoginUserDTO>;
