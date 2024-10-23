import { Request } from 'express';

import { TRequestBody, TRequestParams } from '../../../../rest/types/index.js';
import { CreateUserDTO } from '../index.js';

export type TCreateUserRequest = Request<TRequestParams, TRequestBody, CreateUserDTO>;
