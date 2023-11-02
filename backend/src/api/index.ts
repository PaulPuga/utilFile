import { Router } from 'express';
import pdfManagementRouter from './routes/pdfManagement.route';

export default () => {
  const app = Router();
  pdfManagementRouter(app);

  return app;
};
