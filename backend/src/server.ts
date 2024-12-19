import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';
import swaggerUi from 'swagger-ui-express';

import connectDB from './db/connectDB';
import errorHandler from './middleware/error.middleware';
import router from './routes';
import { createLogFile } from './utils/createLogFile';
import swaggerDocs from './utils/swaggerConfig';

config();

//create express
const app = express();

//middlewares
app.use(
  cors({
    origin: 'http://localhost:3033', // URL frontend
    credentials: true
  })
);

// Middleware  Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(morgan('combined', { stream: createLogFile(__dirname) }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//test writable stream and readable stream
app.get('/', () => {
  const testFile = path.join(__dirname, 'testfile.txt');
  const writeStream = fs.createWriteStream('log.txt');

  const readStream = fs.createReadStream(testFile);

  readStream.pipe(writeStream);
});

//Connect database
connectDB();

//route handlers
app.use('/api', router);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on ${process.env.PORT}`);
  console.log(`API docs available at http://localhost:${process.env.PORT}/api-docs`);
});
