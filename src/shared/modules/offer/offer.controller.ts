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
import { IOfferService, TQueryCity, TQueryCount } from './types/index.js';
import {
  CreateOfferDTO,
  ShortOfferRDO,
  UpdateOfferDTO,
  FullOfferRDO,
  PremiumOfferDTO,
  OfferCountDTO,
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

    this.addRoute({
      path: '/',
      method: EHttpMethod.Get,
      handler: this.index,
      middlewares: [
        new ValidateDTOMiddleware(OfferCountDTO),
      ],
    });
    this.addRoute({
      path: '/',
      method: EHttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDTOMiddleware(CreateOfferDTO),
      ],
    });
    this.addRoute({
      path: '/premium',
      method: EHttpMethod.Get,
      handler: this.premium,
      middlewares: [
        new ValidateDTOMiddleware(PremiumOfferDTO),
      ],
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

  public async index({ query, tokenPayload }: Request<unknown, unknown, unknown, TQueryCount>, res: Response): Promise<void> {
    if (query.count !== undefined && !Number.parseInt(query.count as string, RADIX)) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Count query must be an integer',
        'OfferController',
      );
    }
    const offers = await this.offerService.find(
      Number.parseInt(query?.count as string, RADIX),
      tokenPayload?.id,
    );
    const responseData = fillDTO(ShortOfferRDO, offers);
    this.ok(res, responseData);
  }

  public async create(
    { body, tokenPayload }: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDTO>,
    res: Response,
  ): Promise<void> {
    const result = await this.offerService.create({ ...body, authorId: tokenPayload.id });

    const createdOffer = await this.offerService.findById(result.id, tokenPayload.id);
    this.created(res, fillDTO(FullOfferRDO, createdOffer));
  }

  public async show({ tokenPayload, params }: Request, res: Response): Promise<void> {
    const existsOffer = await this.offerService.findById(params.offerId, tokenPayload?.id);

    const responseData = fillDTO(FullOfferRDO, existsOffer);
    this.ok(res, responseData);
  }

  public async delete({ tokenPayload, params }: Request, res: Response): Promise<void> {
    if (! (await this.offerService.isOwnOffer(params.offerId, tokenPayload.id))) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        'Forbidden',
        'OfferController',
      );
    }
    const result = await this.offerService.deleteById(params.offerId, tokenPayload.id);
    this.noContent(res, result);
  }

  public async update(
    { body, params, tokenPayload }: Request,
    res: Response,
  ): Promise<void> {
    if (! (await this.offerService.isOwnOffer(params.offerId, tokenPayload.id))) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        'Forbidden',
        'OfferController',
      );
    }

    await this.offerService.updateById(
      params.offerId,
      tokenPayload.id,
      body as UpdateOfferDTO,
    );
    const updatedOffer = await this.offerService.findById(params.offerId, tokenPayload.id);
    this.ok(res, fillDTO(FullOfferRDO, updatedOffer));
  }

  public async premium(
    { query, tokenPayload }: Request<unknown, unknown, unknown, TQueryCity>,
    res: Response,
  ): Promise<void> {
    const result = await this.offerService.findPremium(query.city as string, tokenPayload?.id);
    this.ok(res, fillDTO(FullOfferRDO, result));
  }
}
