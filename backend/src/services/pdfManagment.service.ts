import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import JSZip from 'jszip';

import { DOC_POSITION } from '../types/enums';

export type PdfBufferData = {
  buffer: Buffer;
  filename: string;
};

type PageNumberingOptions = {
  startPageNumber: number;
  position: DOC_POSITION;
};

type PdfFileDetails = {
  buffer: Uint8Array;
  filename: string;
  totalPages: number;
};

class PdfManagmentService {
  constructor() {}

  private calculateTextPosition(
    position: DOC_POSITION,
    pageHeight: number,
    pageWidth: number,
    textWidth: number,
  ): { x: number; y: number } {
    let x = 0;
    let y = 0;
    const TOP_MARGIN = 20;
    const BOTTOM_MARGIN = 10;
    const LEFT_RIGHT_MARGIN = 10;
    switch (position) {
      case DOC_POSITION.TOP_CENTER:
        x = (pageWidth - textWidth) / 2;
        y = pageHeight - TOP_MARGIN;
        break;
      case DOC_POSITION.TOP_LEFT:
        x = LEFT_RIGHT_MARGIN;
        y = pageHeight - TOP_MARGIN;
        break;
      case DOC_POSITION.TOP_RIGHT:
        x = pageWidth - textWidth - LEFT_RIGHT_MARGIN;
        y = pageHeight - TOP_MARGIN;
        break;
      case DOC_POSITION.BOTTOM_CENTER:
        x = (pageWidth - textWidth) / 2;
        y = BOTTOM_MARGIN;
        break;
      case DOC_POSITION.BOTTOM_LEFT:
        x = LEFT_RIGHT_MARGIN;
        y = BOTTOM_MARGIN;
        break;
      case DOC_POSITION.BOTTOM_RIGHT:
        x = pageWidth - textWidth - LEFT_RIGHT_MARGIN;
        y = BOTTOM_MARGIN;
        break;
      default:
        x = (pageWidth - textWidth) / 2;
        y = BOTTOM_MARGIN;
        break;
    }

    return { x, y };
  }

  /**
   * @TODO Create method to count the pages of any pdf file in an array and return the number
   */
  private async getPdfsTotalPages() {}

  public async addPageNumbersToPdf(
    data: PdfBufferData,
    options: PageNumberingOptions,
  ): Promise<{
    buffer: Uint8Array;
    totalPages: number;
    filename: string;
  }> {
    try {
      const textFont = StandardFonts.Helvetica;
      const fontSize = 15;

      const pdfDoc = await PDFDocument.load(data.buffer);
      const font = await pdfDoc.embedFont(textFont);
      const pdfPages = pdfDoc.getPages();
      const lastPageNumber = options.startPageNumber - 1 + pdfPages.length;

      let currentPage = options.startPageNumber;

      for (const page of pdfPages) {
        const pageWidth = page.getSize().width;
        const pageHeight = page.getSize().height;
        const paginationText = `Página ${currentPage} de ${lastPageNumber}`;
        const textWidth = font.widthOfTextAtSize(paginationText, fontSize);

        const { x, y } = this.calculateTextPosition(
          options.position,
          pageHeight,
          pageWidth,
          textWidth,
        );

        page.drawText(paginationText, {
          x,
          y,
          size: fontSize,
          font: font,
          color: rgb(0, 0.53, 0.71),
        });
        currentPage++;
      }
      const pdfBytes = await pdfDoc.save();

      return {
        buffer: pdfBytes,
        totalPages: pdfDoc.getPageCount(),
        filename: data.filename,
      };
    } catch (error) {
      throw new Error('Error adding page number in PDF');
    }
  }

  public async addPageNumbersToPdfs(
    data: PdfBufferData[],
    options: PageNumberingOptions,
  ) {
    try {
      const pdfFilesWithPageNumbers: PdfFileDetails[] = [];

      let pageNumber = options.startPageNumber;

      for (const pdfBufferData of data) {
        const pdfFileWithPageNum: PdfFileDetails =
          await this.addPageNumbersToPdf(pdfBufferData, options);

        pageNumber = pageNumber + pdfFileWithPageNum.totalPages;
        pdfFilesWithPageNumbers.push(pdfFileWithPageNum);
      }
      return pdfFilesWithPageNumbers;
    } catch (error) {
      throw new Error('Error adding page number in PDFs');
    }
  }

  public async zipPdfs(pdfFiles: PdfFileDetails[]): Promise<Buffer> {
    try {
      const zip = new JSZip();

      pdfFiles.forEach((pdfFile, index) => {
        zip.file(`${pdfFile.filename}_${index}.pdf`, pdfFile.buffer);
      });

      return await zip.generateAsync({ type: 'nodebuffer' });
    } catch (error) {
      throw new Error('Error trying to zip pdfs');
    }
  }
}

export default PdfManagmentService;
