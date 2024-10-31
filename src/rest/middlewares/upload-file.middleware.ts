import { NextFunction, Request, Response } from 'express';
import multer, { diskStorage } from 'multer';
import { StatusCodes } from 'http-status-codes';
import { extension } from 'mime-types';

import * as crypto from 'node:crypto';

import { IMiddleware } from '../types/index.js';
import { IMAGE_EXTENSIONS } from '../../shared/constants/common.js';
import { HttpError } from '../index.js';

export class UploadFileMiddleware implements IMiddleware {
  constructor(
    private uploadDirectory: string,
    private fieldName: string,
  ) {}

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const storage = diskStorage({
      destination: this.uploadDirectory,
      filename: (_req, file, callback) => {
        const fileExtention = extension(file.mimetype);
        const filename = crypto.randomUUID();
        callback(null, `${filename}.${fileExtention}`);
      },
    });

    const fileFilter = (
      _req: Request,
      file: Express.Multer.File,
      callback: multer.FileFilterCallback,
    ) => {
      const fileExtention = file.originalname.split('.').pop();
      if (fileExtention && !IMAGE_EXTENSIONS.includes(fileExtention)) {
        return callback(new HttpError(
          StatusCodes.BAD_REQUEST,
          'invalid file extension',
          'UploadFileMiddleware',
        ));
      }
      return callback(null, true);
    };

    const uploadSingleFileMiddleware = multer({ storage, fileFilter })
      .single(this.fieldName);

    uploadSingleFileMiddleware(req, res, next);
  }
}
