import Joi from 'joi';
import config from '../../config';

export const pdfFileSchema = Joi.object({
  fieldname: Joi.string().valid('files').required(),
  buffer: Joi.binary().required(),
  originalname: Joi.string()
    .regex(/\.pdf$/)
    .required(),
  encoding: Joi.string().valid('7bit', '8bit', 'binary').required(),
  mimetype: Joi.string().valid('application/pdf').required(),
  destination: Joi.string(),
  filename: Joi.string(),
  path: Joi.string(),
  size: Joi.number().required(),
});

export const pdfFilesSchema = Joi.array()
  .max(config.uploadFiles.uploadLimit)
  .items(pdfFileSchema)
  .required();

export const textInsertionOptionsSchema = Joi.object({
  //change vairable name
  textPosition: Joi.string()
    .valid(
      'TOP_LEFT',
      'TOP_CENTER',
      'TOP_RIGHT',
      'BOTTOM_LEFT',
      'BOTTOM_CENTER',
      'BOTTOM_RIGHT',
    )
    .required(),
});
