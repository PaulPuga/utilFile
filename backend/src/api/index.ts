import { Router } from 'express';
import testRouter from './routes/test.route';
import pdfRouter from './routes/pdf.route';

export default () => {
  const app = Router();
  testRouter(app);
  pdfRouter(app);

  return app;
};
