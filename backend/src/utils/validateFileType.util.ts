import path from 'path';

export const isValidImage = (file: Express.Multer.File): boolean => {
  const validExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  const ext = path.extname(file.originalname).toLowerCase();
  return validExtensions.includes(ext);
};
