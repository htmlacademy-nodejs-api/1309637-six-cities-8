import { TTokenPayload } from './src/shared/modules/auth/types/index.js';

declare module 'express-serve-static-core' {
  export interface Request {
    tokenPayload: TTokenPayload;
  }
}
