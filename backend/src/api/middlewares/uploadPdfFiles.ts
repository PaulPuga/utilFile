import multer from 'multer';
import boom from '@hapi/boom';

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    if (file.mimetype === 'application/pdf') {
      callback(null, true);
    } else {
      callback(boom.badRequest('Files must be pdf'));
    }
  },
  // limits: { files: config.uploadFiles.pdfFilesUploadLimit },
});

export default upload;
