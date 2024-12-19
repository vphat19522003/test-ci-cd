import { Router } from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';

import STATUS_CODE from '@app/constants/responseStatus';
import { CustomError } from '@app/core/response.error';

const testRouter = Router();

const storage = multer.diskStorage({
  destination(req, file, callback) {
    const directoryName = path.join(__dirname, '../../storage');
    if (!fs.existsSync(directoryName)) {
      fs.mkdirSync(directoryName);
    }
    callback(null, path.join(__dirname, '../../storage'));
  },
  filename(req, file, callback) {
    callback(null, file.originalname);
  }
});
const upload = multer({ storage });

testRouter.post('/test-multer', upload.single('file'), (req, res, next) => {
  if (!req.file) {
    return next(new CustomError('NO file uploaded', STATUS_CODE.BAD_REQUEST));
  }
  res.send({
    message: 'File uploaded successfully!',
    fileInfo: req.file
  });
});

export default testRouter;
