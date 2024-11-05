import { NextFunction, Request, Response } from 'express';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { StatusCodes } from 'http-status-codes';

import { IMiddleware } from '../types/index.js';

export class ValidateDTOMiddleware implements IMiddleware {
  constructor(private dto: ClassConstructor<object>) {}

  public async execute({ body, query }: Request, res: Response, next: NextFunction): Promise<void> {
    const dtoInstance = plainToInstance(this.dto, { ...body, ...query });
    const errors = await validate(dtoInstance);

    if (errors.length) {
      res.status(StatusCodes.BAD_REQUEST).send(errors);
      return;
    }

    next();
  }
}
