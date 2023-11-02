import { Router } from 'express';
import pdfManagmentRouter from './routes/pdfManagment.route';

export default () => {
  const app = Router();
  pdfManagmentRouter(app);

  return app;
};
