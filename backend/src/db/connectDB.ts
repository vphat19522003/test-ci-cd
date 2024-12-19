import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    console.log('mongo_uri: ', process.env.MONGO_URI);

    const connectString = process.env.NODE_ENV === 'development' ? process.env.MONGO_URI : '';
    const conn = await mongoose.connect(connectString as string);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log('Error connection to MongoDB: ');
    process.exit(1); // 1 is failure, 0 status code is success
  }
};

export default connectDB;
