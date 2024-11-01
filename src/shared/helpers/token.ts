import { TTokenPayload } from '../modules/auth/types/index.js';

export const isTokenPayload = (payload: unknown): payload is TTokenPayload => ((
  (typeof payload === 'object' && payload !== null) &&
  ('email' in payload && typeof payload.email === 'string') &&
  ('name' in payload && typeof payload.name === 'string') &&
  ('id' in payload && typeof payload.id === 'string')
));
