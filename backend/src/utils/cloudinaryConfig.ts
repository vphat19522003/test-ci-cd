import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { config } from 'dotenv';
import { Readable } from 'stream';

config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadToCloudinary = (file: Express.Multer.File, folder: string): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder
      },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    //streamifier.createReadStream(file.buffer).pipe(stream);
    const bufferStream = new Readable();
    bufferStream.push(file.buffer);
    bufferStream.push(null);

    bufferStream.pipe(stream);
  });
};

export const deleteFromCloudinary = async (public_id: string): Promise<void> => {
  return cloudinary.uploader.destroy(public_id, (error, result) => {
    if (error) {
      console.error('Error deleting image:', error);
    } else {
      console.log('Image deleted:', result);
    }
  });
};

export default cloudinary;
