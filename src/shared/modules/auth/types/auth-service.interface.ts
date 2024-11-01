import { LoginUserDTO } from '../../user/index.js';
import { UserEntity } from '../../user/user.entity.js';

export interface IAuthService {
  authenticate(user: UserEntity): Promise<string>;
  verfy(dto: LoginUserDTO): Promise<UserEntity>;
}
