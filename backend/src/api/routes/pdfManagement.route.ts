import { Router } from 'express';
import uploadFile from '../middlewares/uploadFile';
import pdfManagementController from '../controllers/pdfManagement.controller';
const route = Router();

export default (app: Router) => {
  app.use('/pdf-management', route);

  /**
   * ADD PAGE NUMBER IN MULTIPLE PDF FILES CONSECUTIVELY
   */
  route.post(
    '/pdfs-page-number',
    uploadFile.array('files', 10),
    pdfManagementController.addPdfsPageNumber,
  );
};
