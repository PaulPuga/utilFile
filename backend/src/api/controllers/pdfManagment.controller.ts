import { Request, Response } from 'express';
import PdfManagmentService, {
  PdfBufferData,
} from '../../services/pdfManagment.service';
import { DOC_POSITION } from '../../types/enums';

const addPdfsPageNumber = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0)
      return res.status(400).send('Files not found.');

    const pdfBufferData: PdfBufferData[] = files.map((file) => ({
      buffer: file.buffer,
      filename: file.originalname,
    }));

    const pdfManagment = new PdfManagmentService();

    const pdfsWithPageNumber = await pdfManagment.addPageNumbersToPdfs(
      pdfBufferData,
      { position: req.body.textPosition as DOC_POSITION, startPageNumber: 1 },
    );
    const zipPdfs = await pdfManagment.zipPdfs(pdfsWithPageNumber);

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=pdf_with_page_num.zip');
    res.send(zipPdfs);
  } catch (error) {
    res.status(500).send('Error to add page in pdfs');
  }
};

export default {
  addPdfsPageNumber,
};
