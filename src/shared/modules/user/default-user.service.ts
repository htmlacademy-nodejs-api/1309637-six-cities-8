import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import { IUserService } from './types/index.js';
import { UserEntity, CreateUserDTO, UpdateUserDTO, populateFavorites } from './index.js';
import { COMPONENT } from '../../constants/index.js';
import { ILogger } from '../../libs/logger/types/index.js';

@injectable()
export class DefaultUserService implements IUserService {
  constructor(
    @inject(COMPONENT.LOGGER) private readonly logger: ILogger,
    @inject(COMPONENT.USER_MODEL) private readonly userModel: types.ModelType<UserEntity>,
  ) {}

  public async create(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto, dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    const result = await this.userModel
      .aggregate([
        { $match: { email } },
        populateFavorites
      ])
      .exec();

    return result[0] || null;
  }

  public async findOrCreate(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser) {
      return existedUser;
    }

    return this.create(dto, salt);
  }

  public async updateById(userId: string, dto: UpdateUserDTO): Promise<DocumentType<UserEntity> | null> {
    return this.userModel
      .findByIdAndUpdate(userId, dto, { new: true })
      .exec();
  }

  public async addFavorite(userId: string ,offerId: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel
      .findByIdAndUpdate(userId, {
        $addToSet: { favorites: offerId },
      }, { new: true })
      .exec();
  }

  public async deleteFavorite(userId: string, offerId: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel
      .findByIdAndUpdate(userId, {
        $pull: { favorites: offerId },
      }, { new: true })
      .exec();
  }
}
