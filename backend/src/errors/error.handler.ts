import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';
import multer from 'multer';

export const logErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // console.log(err);
  next(err);
};
export const multerErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      throw boom.badRequest(err);
    }
    return res.status(500).send('Error trying to upload file');
  } else if (err) {
    next(err);
  }
};
export const boomErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (boom.isBoom(err)) {
    const { output } = err;
    const statusCode = output.statusCode || 500;
    const payload = output.payload || 'Internal Server Error';

    res.status(statusCode).json({ error: payload });
  } else {
    next(err);
  }
};
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  res.status(500).json({
    error: {
      statusCode: 500,
      error: 'Internal Server Error',
      message: err.message || 'Internal Server Error',
    },
  });
};
