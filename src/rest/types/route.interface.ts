import { NextFunction, Request, Response } from 'express';

import { EHttpMethod, IMiddleware } from './index.js';

export interface IRoute {
  path: string;
  method: EHttpMethod;
  handler: (req: Request, res: Response, next: NextFunction) => Promise<void> | void;
  middlewares?: IMiddleware[];
}
