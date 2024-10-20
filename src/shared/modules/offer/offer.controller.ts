import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';

import { BaseController } from '../../../rest/index.js';
import { EHttpMethod } from '../../../rest/types/index.js';
import { COMPONENT } from '../../constants/index.js';
import { ILogger } from '../../libs/logger/types/index.js';
import { IOfferService } from './types/index.js';
import { CreateOfferDTO, OfferRDO } from './index.js';
import { fillDTO } from '../../helpers/index.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(COMPONENT.LOGGER) protected readonly logger: ILogger,
    @inject(COMPONENT.OFFER_SERVICE) private readonly offerService: IOfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({ path: '/', method: EHttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: EHttpMethod.Post, handler: this.create });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const responseData = fillDTO(OfferRDO, offers);
    this.ok(res, responseData);
  }

  public async create(
    { body }: Request<Record<string, unknown>, CreateOfferDTO>,
    res: Response,
  ): Promise<void> {
    const result = await this.offerService.create(body);
    this.created(res, fillDTO(OfferRDO, result));
  }
}
