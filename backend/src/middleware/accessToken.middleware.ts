import { NextFunction, Request, Response } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import mongoose, { InferSchemaType } from 'mongoose';

import STATUS_CODE from '@app/constants/responseStatus';
import { CustomError } from '@app/core/response.error';
import UserRepository, { UserInfo } from '@app/repository/user.repository';
import KeyService from '@app/services/key.service';

export interface IRequestCustom<T = any> extends Request {
  user?: InferSchemaType<UserInfo>;
  //   key: Pick<InferSchemaType<typeof keyStoreSchema>, 'public_key'>
  //   keyStore?: InferSchemaType<typeof keyStoreSchema>;
  //   refresh_token?: string;
  //   body: T;
}

const verifyAccessToken = async (req: IRequestCustom, res: Response, next: NextFunction): Promise<void> => {
  const access_token = req.cookies['access_token'] as string;
  const client_id = req.cookies['client_id'] as string;
  const refresh_token = req.cookies['refresh_token'] as string;

  if (!access_token || !client_id || !refresh_token)
    return next(new CustomError('Unauthorized - no token provided', STATUS_CODE.UNAUTHORIZED));

  // client_id format
  if (!mongoose.Types.ObjectId.isValid(client_id)) {
    return next(new CustomError('Invalid client ID format', STATUS_CODE.BAD_REQUEST));
  }

  //find user
  const user = await UserRepository.findUserById(client_id);
  if (!user) return next(new CustomError('User not found', STATUS_CODE.UNAUTHORIZED));

  //find key
  const key = await KeyService.findKeyByUserId(client_id);
  if (!key) return next(new CustomError('Unauthorized - not found key', STATUS_CODE.UNAUTHORIZED));

  try {
    jwt.verify(access_token, key.public_key);
    req.user = user;
    return next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return next(new CustomError('Access token expired', STATUS_CODE.UNAUTHORIZED));
    }

    return next(new CustomError('Invalid access token', STATUS_CODE.FORBIDDEN));
  }
};
export default verifyAccessToken;
