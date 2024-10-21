import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { BaseController, HttpError } from '../../../rest/index.js';
import { EHttpMethod } from '../../../rest/types/index.js';
import { COMPONENT } from '../../constants/index.js';
import { ILogger } from '../../libs/logger/types/index.js';
import { IOfferService } from './types/index.js';
import { CreateOfferDTO, OfferRDO, UpdateOfferDTO } from './index.js';
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
    this.addRoute({ path: '/:offerId', method: EHttpMethod.Get, handler: this.findOne});
    this.addRoute({ path: '/:offerId', method: EHttpMethod.Delete, handler: this.delete});
    this.addRoute({ path: '/:offerId', method: EHttpMethod.Patch, handler: this.update});
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const responseData = fillDTO(OfferRDO, offers);
    this.ok(res, responseData);
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDTO>,
    res: Response,
  ): Promise<void> {
    const result = await this.offerService.create(body);
    this.created(res, fillDTO(OfferRDO, result));
  }

  public async findOne(req: Request, res: Response): Promise<void> {
    const existsOffer = await this.offerService.findById(req.params.offerId);

    if (!existsOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${req.params.offerId} not found.`,
        'OfferController',
      );
    }

    const responseData = fillDTO(OfferRDO, existsOffer);
    this.ok(res, responseData);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const result = await this.offerService.deleteById(req.params.offerId);

    this.noContent(res, result);
  }

  public async update(
    req: Request,
    res: Response,
  ): Promise<void> {
    const result = await this.offerService.updateById(req.params.offerId, req.body as UpdateOfferDTO);

    if (!result) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${req.params.offerId} not found.`,
        'OfferController',
      );
    }

    this.ok(res, result);
  }
}
