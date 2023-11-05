import { CorsOptions } from 'cors';

const whitelist = ['http://localhost:3000'];

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin as string)) {
      callback(new Error('Not allowed by CORS'));
    } else {
      callback(null, true);
    }
  },
};
