import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
  BaseController,
  HttpError,
  ValidateObjectIdMiddleware,
  ValidateDTOMiddleware,
  DocumentExistsMiddleware,
  PrivateRouteMiddleware,
} from '../../../rest/index.js';
import { EHttpMethod } from '../../../rest/types/index.js';
import { COMPONENT, RADIX } from '../../constants/index.js';
import { ILogger } from '../../libs/logger/types/index.js';
import { IOfferService, TQueryCount } from './types/index.js';
import {
  CreateOfferDTO,
  ShortOfferRDO,
  UpdateOfferDTO,
  FullOfferRDO,
  PremiumOfferDTO,
} from './index.js';
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
    this.addRoute({
      path: '/',
      method: EHttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDTOMiddleware(CreateOfferDTO),
      ]
    });
    this.addRoute({
      path: '/premium',
      method: EHttpMethod.Post,
      handler: this.premium,
      middlewares: [new ValidateDTOMiddleware(PremiumOfferDTO)]
    });
    this.addRoute({
      path: '/:offerId',
      method: EHttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/:offerId',
      method: EHttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/:offerId',
      method: EHttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDTOMiddleware(UpdateOfferDTO),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
  }

  public async index({ query }: Request<unknown, unknown, unknown, TQueryCount>, res: Response): Promise<void> {
    if (query.count !== undefined && !Number.parseInt(query.count as string, RADIX)) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Count query must be an integer',
        'UserController',
      );
    }
    const offers = await this.offerService.find(Number.parseInt(query?.count as string, RADIX));
    const responseData = fillDTO(ShortOfferRDO, offers);
    this.ok(res, responseData);
  }

  public async create(
    { body, tokenPayload }: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDTO>,
    res: Response,
  ): Promise<void> {
    const result = await this.offerService.create({ ...body, authorId: tokenPayload.id });
    this.created(res, fillDTO(FullOfferRDO, result));
  }

  public async show(req: Request, res: Response): Promise<void> {
    const existsOffer = await this.offerService.findById(req.params.offerId);

    const responseData = fillDTO(FullOfferRDO, existsOffer);
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
    this.ok(res, fillDTO(FullOfferRDO, result));
  }

  public async premium(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, PremiumOfferDTO>,
    res: Response,
  ): Promise<void> {
    const result = await this.offerService.findPremium(body.city);
    this.ok(res, fillDTO(FullOfferRDO, result));
  }
}
