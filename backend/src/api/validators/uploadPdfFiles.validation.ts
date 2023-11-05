import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';
import {
  pdfFilesSchema,
  pdfFilesOptionsSchema,
} from '../schemas/pdfManagement.schemas';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const files = req.files as Express.Multer.File[];
    const options = req.body;

    const { error: pdfFilesError } = pdfFilesSchema.validate(files);
    if (pdfFilesError) throw boom.badRequest(pdfFilesError);

    const { error: optionsError } = pdfFilesOptionsSchema.validate(options);
    if (optionsError) throw boom.badRequest(optionsError);

    next();
  } catch (error) {
    next(error);
  }
};
