import { CorsOptions } from 'cors';
import boom from '@hapi/boom';

const whitelist = ['http://localhost:3000'];

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin as string) || !origin) {
      callback(null, true);
    } else {
      callback(boom.unauthorized('Not allowed by CORS'));
    }
  },
};
