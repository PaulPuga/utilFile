import { Router } from 'express';
import uploadFile from '../middlewares/uploadPdfFiles';
import pdfManagementController from '../controllers/pdfManagement.controller';
import { validateUpdatePdfFiles } from '../validators/pdfManagement.validation';
const route = Router();

export default (app: Router) => {
  app.use('/pdf-management', route);

  /**
   * ADD PAGE NUMBER IN MULTIPLE PDF FILES CONSECUTIVELY
   */
  route.post(
    '/pdfs-page-number',
    uploadFile.array('files'),
    validateUpdatePdfFiles,
    pdfManagementController.addPdfsPageNumber,
  );
};
