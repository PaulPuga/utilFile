import { NextFunction, Request, Response } from 'express';
//import boom from '@hapi/boom';

import { IPdfFile } from '../../services/PdfFile';
import PdfManagementService, {
  IAddPageNumToPdfsDTO,
} from '../../services/pdfManagement.service';
import { DOC_POSITION } from '../../types/enums';

const addPdfsPageNumber = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const files = req.files as Express.Multer.File[];

    const pdfs: IPdfFile[] = files.map((file) => ({
      filename: file.originalname,
      buffer: file.buffer,
      mimetype: file.mimetype,
    }));

    const addPageNumToPdfsDTO: IAddPageNumToPdfsDTO = {
      files: pdfs,
      textPosition: req.body.textPosition as DOC_POSITION,
      startPage: Number(req.body.startPage),
      consecutiveFiles: req.body.consecutiveFiles === 'true',
    };

    const pdfManagement = new PdfManagementService();

    const pdfsWithPageNumber =
      await pdfManagement.addPageNumbersToPdfs(addPageNumToPdfsDTO);

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
