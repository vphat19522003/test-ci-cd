import multer from 'multer';

import { MAX_FILE_SIZE } from '@app/constants/file';

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE
  }
});
