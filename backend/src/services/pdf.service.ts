import fs from 'fs';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export default class PdfService {
  fileBuffer: Buffer;

  constructor(fileBuffer: Buffer) {
    this.fileBuffer = fileBuffer;
  }

  async readFile() {
    try {
      const pdfDoc = await PDFDocument.load(this.fileBuffer);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      for (const page of pdfDoc.getPages()) {
        const { width, height } = page.getSize();
        const fontSize = 15;
        const text = 'Pagina n de n';
        const textWidth = font.widthOfTextAtSize(text, fontSize);

        page.drawText(text, {
          x: (width - textWidth) / 2,
          y: 4,
          size: fontSize,
          font: font,
          color: rgb(0, 0.53, 0.71),
        });

        const pdfBytes = await pdfDoc.save();

        return pdfBytes;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
