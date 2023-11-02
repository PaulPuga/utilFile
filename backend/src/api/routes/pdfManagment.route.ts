import { Router } from 'express';
import uploadFile from '../middlewares/uploadFile';
import pdfManagmentController from '../controllers/pdfManagment.controller';
const route = Router();

export default (app: Router) => {
  app.use('/pdf-managment', route);

  /**
   * ADD PAGE NUMBER IN MULTIPLE PDF FILES CONSECUTIVELY
   */
  route.post(
    '/pdfs-page-number',
    uploadFile.array('files', 10),
    pdfManagmentController.addPdfsPageNumber,
  );
};
