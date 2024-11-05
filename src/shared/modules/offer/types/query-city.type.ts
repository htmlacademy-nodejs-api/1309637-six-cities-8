import { Query } from 'express-serve-static-core';

export type TQueryCity = {
  city: string;
} | Query;
