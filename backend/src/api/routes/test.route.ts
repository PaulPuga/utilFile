import { Router } from 'express';
import path from 'path';
import uploadFile from '../middlewares/uploadFile';
import pdfService from '../../services/pdf.service';
const route = Router();

export default (app: Router) => {
  app.use('/test-api', route);

  /**
   * CHECK IF THE ROUTES WORKS FINE
   */
  route.post('/', uploadFile.single('file'), async (req, res) => {
    try {
      if (req.file?.buffer) {
        const pdf = new pdfService(req.file.buffer);
        const pdfModified = await pdf.readFile();

        // Configura los encabezados de la respuesta para indicar que se trata de un archivo PDF
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader(
          'Content-Disposition',
          'attachment; filename="archivo_modificado.pdf"',
        );

        res.end(pdfModified);
      }
    } catch (error) {
      console.log(error);
    }
  });
  route.get('/', (req, res) => {
    res.json({ message: 'HELLO WORLD' });
  });
};
