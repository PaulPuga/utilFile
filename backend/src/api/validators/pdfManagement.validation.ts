import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';
import config from '../../config';
import {
  pdfFilesSchema,
  textInsertionOptionsSchema,
} from '../schemas/pdfManagement.schemas';

const fileUploadLimit = config.uploadFiles.uploadLimit;

export const validateUpdatePdfFiles = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const files = req.files as Express.Multer.File[];
    const options = req.body;

    if (files.length > fileUploadLimit)
      throw boom.badRequest(
        'too many files, they must be less than ' + fileUploadLimit,
      );

    const { error: pdfFilesError } = pdfFilesSchema.validate(files);
    if (pdfFilesError) throw boom.badRequest(pdfFilesError.message);

    const { error: optionsError } =
      textInsertionOptionsSchema.validate(options);
    if (optionsError) throw boom.badRequest(optionsError);

    next();
  } catch (error) {
    next(error);
  }
};
