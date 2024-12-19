import { NextFunction, Request, Response } from 'express';
import { omit } from 'lodash';

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction): Response => {
  // Ensure the error contains a message
  const status = error.status || 500;
  console.log({ status });
  const message = error.message || 'An error occurred';

  return res.status(status).json({
    message,
    ...omit(error, ['stack'])
  });
};

export default errorHandler;
