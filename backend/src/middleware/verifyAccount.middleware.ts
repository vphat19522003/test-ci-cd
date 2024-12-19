import { NextFunction, Response } from 'express';

import STATUS_CODE from '@app/constants/responseStatus';
import { CustomError } from '@app/core/response.error';
import { UserInfo } from '@app/repository/user.repository';

import { IRequestCustom } from './accessToken.middleware';

const verifyAccountHandler = async (req: IRequestCustom, res: Response, next: NextFunction): Promise<void> => {
  //find user
  const user = req.user as UserInfo;
  if (!user) return next(new CustomError('User not found', STATUS_CODE.UNAUTHORIZED));

  if (!user.isVerified) {
    return next(new CustomError('Account is not verified', STATUS_CODE.UNAUTHORIZED));
  }
  return next();
};

export default verifyAccountHandler;
