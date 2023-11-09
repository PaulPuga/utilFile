import PdfFile, { IPdfFile, IPageNumOptions } from './PdfFile';

export interface IAddPageNumToPdfsDTO extends IPageNumOptions {
  files: IPdfFile[];
  consecutiveFiles: boolean;
}

class PdfManagementService {
  constructor() {}

  private async getPdfsTotalPages(files: IPdfFile[]) {
    let sum = 0;
    for (const file of files) {
      sum += await PdfFile.getTotalPages(file);
    }
    return sum;
  }

  public async addPageNumbersToPdfs(data: IAddPageNumToPdfsDTO) {
    const { files, startPage, textPosition, consecutiveFiles } = data;
    const pdfsWithPageNum: PdfFile[] = [];

    if (consecutiveFiles) {
      const sumPdfsPages = await this.getPdfsTotalPages(files);
      let firstPage = startPage;
      for (const file of files) {
        const pdfFile = new PdfFile(file.filename, file.buffer);
        const pdfWithPageNum = await pdfFile.addPageNumbers({
          startPage: firstPage,
          textPosition,
          finalPage: sumPdfsPages,
        });
        pdfsWithPageNum.push(pdfWithPageNum);
        firstPage += pdfWithPageNum.totalPages as number;
      }
    } else {
      for (const file of files) {
        const pdfFile = new PdfFile(file.filename, file.buffer);
        const pdfWithPageNum = await pdfFile.addPageNumbers({
          startPage,
          textPosition,
        });
        pdfsWithPageNum.push(pdfWithPageNum);
      }
    }
    return pdfsWithPageNum;
  }

  public async zipPdfs(files: IPdfFile[]) {
    const zipFile = await PdfFile.zipFiles(files);
    return zipFile;
  }
}

export default PdfManagementService;
