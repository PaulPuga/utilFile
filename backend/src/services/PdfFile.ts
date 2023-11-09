import File, { IFile } from './File';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { DOC_POSITION } from '../types/enums';

export interface IPdfFile extends IFile {
  totalPages?: number;
}
export interface IPageNumOptions {
  textPosition: DOC_POSITION;
  startPage: number;
  finalPage?: number;
}

export default class PdfFile extends File implements IPdfFile {
  public totalPages?: number | undefined;

  constructor(
    filename: IFile['filename'],
    buffer: IFile['buffer'],
    totalPages?: number,
  ) {
    const mimetype = 'application/pdf';
    super(filename, buffer, mimetype);
    this.totalPages = totalPages;
  }

  private calculateTextPosition(
    position: DOC_POSITION,
    pageHeight: number,
    pageWidth: number,
    textWidth: number,
  ) {
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

  public static async getTotalPages(pdf: IPdfFile) {
    return await (await PDFDocument.load(pdf.buffer)).getPageCount();
  }

  public async addPageNumbers(data: IPageNumOptions): Promise<PdfFile> {
    const { textPosition, startPage } = data;
    let finalPage = data.finalPage;

    const textFont = StandardFonts.Helvetica;
    const textColor = rgb(1, 0, 0);
    const fontSize = 15;

    const pdfDoc = await PDFDocument.load(this.buffer);
    const embeddedFont = await pdfDoc.embedFont(textFont);
    const pdfPages = pdfDoc.getPages();

    this.totalPages = pdfPages.length;

    finalPage = finalPage ?? startPage - 1 + this.totalPages;

    let currentPage = startPage;

    for (const page of pdfPages) {
      const pageWidth = page.getSize().width;
      const pageHeight = page.getSize().height;
      const paginationText = `Página ${currentPage} de ${finalPage}`;
      const textWidth = embeddedFont.widthOfTextAtSize(
        paginationText,
        fontSize,
      );

      const { x, y } = this.calculateTextPosition(
        textPosition,
        pageHeight,
        pageWidth,
        textWidth,
      );

      page.drawText(paginationText, {
        x,
        y,
        size: fontSize,
        font: embeddedFont,
        color: textColor,
      });
      currentPage++;
    }
    const pdfBytes = await pdfDoc.save();

    return new PdfFile(this.filename, pdfBytes, this.totalPages);
  }
}
