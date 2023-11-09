import JSZip from 'jszip';

// export enum AllowedMimetypes {
//   PDF = 'application/pdf',
// }

export interface IFile {
  filename: string;
  buffer: Buffer | Uint8Array;
  mimetype: string;
}

export default abstract class File implements IFile {
  constructor(
    public filename: IFile['filename'],
    public buffer: IFile['buffer'],
    public mimetype: IFile['mimetype'],
  ) {}

  public static async zipFiles(files: IFile[]): Promise<Buffer> {
    const zip = new JSZip();
    files.forEach((file, index) => {
      zip.file(`${index + 1}_${file.filename}`, file.buffer);
    });
    return await zip.generateAsync({ type: 'nodebuffer' });
  }
}
