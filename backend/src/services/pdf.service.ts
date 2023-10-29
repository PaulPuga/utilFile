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
      const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

      for (const page of pdfDoc.getPages()) {
        const { height } = page.getSize();
        const fontSize = 30;
        page.drawText('HOLA MUNDO', {
          x: 50,
          y: height - 4 * fontSize,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0.53, 0.71),
        });

        const pdfBytes = await pdfDoc.save();

        return pdfBytes;

        console.log('PDF modificado guardado con éxito.');
      }
    } catch (error) {
      console.log(error);
    }
  }
}
