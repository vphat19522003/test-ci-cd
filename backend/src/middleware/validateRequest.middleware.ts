import { NextFunction, Request, Response } from 'express';
import { ValidationError, validationResult } from 'express-validator';

import STATUS_CODE from '@app/constants/responseStatus';
import { CustomError } from '@app/core/response.error';

const validateRequest = (validators: any[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    for (const validator of validators) {
      await validator.run(req);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const extractedErrors: string[] = [];
      errors.array().map((err: ValidationError) => extractedErrors.push(err.msg));
      next(new CustomError(extractedErrors[0], STATUS_CODE.BAD_REQUEST));
    }

    next();
  };
};

export default validateRequest;
