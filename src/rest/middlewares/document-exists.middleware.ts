import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { IDocumentExists, IMiddleware } from '../types/index.js';
import { HttpError } from '../index.js';

export class DocumentExistsMiddleware implements IMiddleware {
  constructor(
    private readonly service: IDocumentExists,
    private readonly entityName: string,
    private readonly paramName: string,
  ) {}

  public async execute({ params }: Request, _res: Response, next: NextFunction): Promise<void> {
    const documentId = params[this.paramName];
    if (!documentId) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `${documentId} is not defined`,
        'DocumentExistsMiddleware'
      );
    }

    if (! await this.service.exists(documentId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `${this.entityName} with ${documentId} not found.`,
        'DocumentExistsMiddleware'
      );
    }

    next();
  }
}
