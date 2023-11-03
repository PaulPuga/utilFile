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
  totalPages?: number;
};

type PdfFileDetails = {
  buffer: Uint8Array;
  filename: string;
  totalPages: number;
};

class PdfManagementService {
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

  private async calculatePdfsTotalPages(
    data: PdfBufferData[],
  ): Promise<number> {
    // try {
    let totalPdfsPages = 0;
    for (const pdfBufferData of data) {
      totalPdfsPages += (
        await PDFDocument.load(pdfBufferData.buffer)
      ).getPageCount();
    }
    return totalPdfsPages;
    // } catch (error) {
    //   throw new Error('Error traying to couant pdfs total pages');
    // }
  }

  public async addPageNumbersToPdf(
    data: PdfBufferData,
    options: PageNumberingOptions,
  ): Promise<{
    buffer: Uint8Array;
    totalPages: number;
    filename: string;
  }> {
    const textFont = StandardFonts.Helvetica;
    const textColor = rgb(1, 0, 0);
    const fontSize = 15;

    const pdfDoc = await PDFDocument.load(data.buffer);
    const font = await pdfDoc.embedFont(textFont);
    const pdfPages = pdfDoc.getPages();
    const lastPageNumber =
      options.totalPages ?? options.startPageNumber - 1 + pdfPages.length;

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
        color: textColor,
      });
      currentPage++;
    }
    const pdfBytes = await pdfDoc.save();

    return {
      buffer: pdfBytes,
      totalPages: pdfDoc.getPageCount(),
      filename: data.filename,
    };
  }

  public async addPageNumbersToPdfs(
    data: PdfBufferData[],
    options: PageNumberingOptions,
  ) {
    options.totalPages = await this.calculatePdfsTotalPages(data);
    const pdfFilesWithPageNumbers: PdfFileDetails[] = [];

    for (const pdfBufferData of data) {
      const pdfFileWithPageNum: PdfFileDetails = await this.addPageNumbersToPdf(
        pdfBufferData,
        options,
      );

      options.startPageNumber += pdfFileWithPageNum.totalPages;
      pdfFilesWithPageNumbers.push(pdfFileWithPageNum);
    }
    return pdfFilesWithPageNumbers;
  }

  public async zipPdfs(pdfFiles: PdfFileDetails[]): Promise<Buffer> {
    const zip = new JSZip();

    pdfFiles.forEach((pdfFile, index) => {
      zip.file(`${pdfFile.filename}_${index}.pdf`, pdfFile.buffer);
    });

    return await zip.generateAsync({ type: 'nodebuffer' });
  }
}

export default PdfManagementService;
