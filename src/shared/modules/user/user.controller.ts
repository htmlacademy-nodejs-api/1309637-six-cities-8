import { inject, injectable } from 'inversify';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { BaseController, HttpError } from '../../../rest/index.js';
import { EHttpMethod } from '../../../rest/types/index.js';
import { ILogger } from '../../libs/logger/types/index.js';
import { COMPONENT } from '../../constants/index.js';
import { IUserService, TCreateUserRequest, TLoginUserRequest } from './types/index.js';
import { IConfig, TRestSchema } from '../../libs/config/types/index.js';
import { fillDTO } from '../../helpers/index.js';
import { UserRDO } from './index.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(COMPONENT.LOGGER) protected readonly logger: ILogger,
    @inject(COMPONENT.USER_SERVICE) private readonly userService: IUserService,
    @inject(COMPONENT.CONFIG) private readonly config: IConfig<TRestSchema>,
  ) {
    super(logger);

    this.logger.info('Register routes for UserController...');

    this.addRoute({ path: '/register', method: EHttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/login', method: EHttpMethod.Post, handler: this.login });
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
    _res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (!existsUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${body.email} not found.`,
        'UserController',
      );
    }

    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController',
    );
  }
}
