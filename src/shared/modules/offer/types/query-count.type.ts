import { ParamsDictionary } from 'express-serve-static-core';

export type TQueryCount = {
  count?: number
} | ParamsDictionary;
