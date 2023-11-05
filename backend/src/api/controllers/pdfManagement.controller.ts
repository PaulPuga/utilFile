import { NextFunction, Request, Response } from 'express';
//import boom from '@hapi/boom';

import PdfManagementService, {
  PdfBufferData,
} from '../../services/pdfManagement.service';
import { DOC_POSITION } from '../../types/enums';

const addPdfsPageNumber = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const files = req.files as Express.Multer.File[];
    const textPosition = req.body.textPosition as DOC_POSITION;
    const startPageNumber = 1;

    const pdfBufferData: PdfBufferData[] = files.map((file) => ({
      buffer: file.buffer,
      filename: file.originalname,
    }));

    const pdfManagement = new PdfManagementService();

    const pdfsWithPageNumber = await pdfManagement.addPageNumbersToPdfs(
      pdfBufferData,
      { position: textPosition, startPageNumber },
    );
    const zipPdfs = await pdfManagement.zipPdfs(pdfsWithPageNumber);

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=pdf_with_page_num.zip',
    );
    res.send(zipPdfs);
  } catch (error) {
    next(error);
  }
};

export default {
  addPdfsPageNumber,
};
