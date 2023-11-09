import multer from 'multer';
import boom from '@hapi/boom';
import config from '../../config';

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    if (file.mimetype !== 'application/pdf')
      callback(boom.badRequest('Files must be pdf'));

    callback(null, true);
  },
  limits: { fileSize: config.uploadFiles.mbLimitSize * 1024 * 1024 },
});

export default upload;
