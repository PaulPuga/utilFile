import { Router } from 'express';
import testRouter from './routes/test.route';

export default () => {
  const app = Router();
  testRouter(app);

  return app;
};
