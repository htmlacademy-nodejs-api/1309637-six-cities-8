import { inject, injectable } from 'inversify';
import * as crypto from 'node:crypto';
import { SignJWT } from 'jose';

import { IAuthService, TTokenPayload } from './types/index.js';
import { COMPONENT, JWT_ALGORITHM, JWT_EXPIRED } from '../../constants/index.js';
import { ILogger } from '../../libs/logger/types/index.js';
import { LoginUserDTO } from '../user/index.js';
import { IUserService } from '../user/types/index.js';
import { UserEntity } from '../user/user.entity.js';
import { IConfig, TRestSchema } from '../../libs/config/types/index.js';
import {
  UserNotFoundException,
  UserPasswordIncorrectException,
} from './errors/index.js';

@injectable()
export class DefualtAuthService implements IAuthService {
  constructor(
    @inject(COMPONENT.LOGGER) private readonly logger: ILogger,
    @inject(COMPONENT.USER_SERVICE) private readonly userService: IUserService,
    @inject(COMPONENT.CONFIG) private readonly config: IConfig<TRestSchema>,
  ) {}

  public async authenticate(user: UserEntity): Promise<string> {
    const jwtSecret = this.config.get('JWT_SECRET');
    const secretKey = crypto.createSecretKey(jwtSecret, 'utf-8');
    const tokenPayload: TTokenPayload = {
      email: user.email,
      name: user.name,
      id: user.id,
    };

    this.logger.info(`Create token for ${user.email}`);
    return new SignJWT(tokenPayload)
      .setProtectedHeader({ alg: JWT_ALGORITHM })
      .setIssuedAt()
      .setExpirationTime(JWT_EXPIRED)
      .sign(secretKey);
  }

  public async verify(dto: LoginUserDTO): Promise<UserEntity> {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) {
      this.logger.warn(`User with ${dto.email} not found`);
      throw new UserNotFoundException();
    }

    if (!user.verifyPassword(dto.password, this.config.get('SALT'))) {
      this.logger.warn(`Incorrect password for ${dto.email}`);
      throw new UserPasswordIncorrectException();
    }

    return user;
  }
}
