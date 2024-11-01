import { inject, injectable } from 'inversify';
import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
  BaseController,
  HttpError,
  ValidateObjectIdMiddleware,
  ValidateDTOMiddleware,
  DocumentExistsMiddleware,
  UploadFileMiddleware,
} from '../../../rest/index.js';
import { EHttpMethod } from '../../../rest/types/index.js';
import { ILogger } from '../../libs/logger/types/index.js';
import { COMPONENT } from '../../constants/index.js';
import { IUserService, TCreateUserRequest, TLoginUserRequest } from './types/index.js';
import { IConfig, TRestSchema } from '../../libs/config/types/index.js';
import { fillDTO } from '../../helpers/index.js';
import { CreateUserDTO, LoginUserDTO, UserRDO } from './index.js';
import { IOfferService, TParamOfferId } from '../offer/types/index.js';
import { ShortOfferRDO } from '../offer/index.js';
import { IAuthService } from '../auth/types/index.js';
import { LoggedUserRDO } from './index.js';

const MOCK_USER = '66f947e7e706754fb39b93a7';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(COMPONENT.LOGGER) protected readonly logger: ILogger,
    @inject(COMPONENT.USER_SERVICE) private readonly userService: IUserService,
    @inject(COMPONENT.OFFER_SERVICE) private readonly offerService: IOfferService,
    @inject(COMPONENT.CONFIG) private readonly config: IConfig<TRestSchema>,
    @inject(COMPONENT.AUTH_SERVICE) private readonly authService: IAuthService,
  ) {
    super(logger);

    this.logger.info('Register routes for UserController...');

    this.addRoute({
      path: '/register',
      method: EHttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDTOMiddleware(CreateUserDTO)],
    });
    this.addRoute({
      path: '/login',
      method: EHttpMethod.Post,
      handler: this.login,
      middlewares: [new ValidateDTOMiddleware(LoginUserDTO)],
    });
    this.addRoute({
      path: '/login',
      method: EHttpMethod.Get,
      handler: this.checkAuthenticate,
    });
    this.addRoute({ path: '/favorites/', method: EHttpMethod.Get, handler: this.showFavorites });
    this.addRoute({
      path: '/favorites/:offerId',
      method: EHttpMethod.Post,
      handler: this.addFavorite,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/favorites/:offerId',
      method: EHttpMethod.Delete,
      handler: this.deleteFavorite,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/avatar',
      method: EHttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new UploadFileMiddleware(this.config.get('UPLOAD_DIRECTORY'), 'avatarPath'),
      ]
    });
  }

  public async create(
    { body }: TCreateUserRequest,
    res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'UserController',
      );
    }

    const result = await this.userService.create(body, this.config.get('SALT'));
    this.created(res, fillDTO(UserRDO, result));
  }

  public async login(
    { body }: TLoginUserRequest,
    res: Response,
  ): Promise<void> {
    const user = await this.authService.verify(body);
    const token = await this.authService.authenticate(user);
    const responseData = fillDTO(LoggedUserRDO, {
      email: user.email,
      token,
    });
    this.ok(res, responseData);
  }

  public async showFavorites(_req: Request, res: Response): Promise<void> {
    const result = await this.userService.getFavorites(MOCK_USER);
    this.ok(res, fillDTO(ShortOfferRDO, result));
  }

  public async addFavorite({ params }: Request<TParamOfferId>, res: Response): Promise<void> {
    const favorites = await this.userService.getFavorites(MOCK_USER);

    if (favorites.map((item) => item._id.toString()).includes(params.offerId)) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `Offer ${params.offerId} is already in favorites`,
        'UserController',
      );
    }

    const result = await this.userService.addFavorite(MOCK_USER, params.offerId);
    this.ok(res, fillDTO(UserRDO, result));
  }

  public async deleteFavorite({ params }: Request<TParamOfferId>, res: Response): Promise<void> {
    const result = await this.userService.deleteFavorite(MOCK_USER, params.offerId);
    this.ok(res, fillDTO(UserRDO, result));
  }

  public async uploadAvatar(req: Request, res: Response): Promise<void> {
    this.created(res, {
      filepath: req.file?.path
    });
  }

  public async checkAuthenticate({ tokenPayload: { email }}: Request, res: Response) {
    const foundedUser = await this.userService.findByEmail(email);

    if (!foundedUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    this.ok(res, fillDTO(LoggedUserRDO, foundedUser));
  }
}
