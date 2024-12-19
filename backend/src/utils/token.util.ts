import jwt from 'jsonwebtoken';

import STATUS_CODE from '@app/constants/responseStatus';
import { CustomError } from '@app/core/response.error';

export type payloadType = {
  username: string;
  email: string;
  _id: string;
  isVerified: boolean;
};

type keyType = {
  public_key: string;
  private_key: string;
};

type pairTokenType = {
  payload: payloadType;
  key: keyType;
};

type tokenType = {
  access_token: string;
  refresh_token: string;
};

export const createPairToken = ({ payload, key }: pairTokenType): tokenType => {
  try {
    const access_token = jwt.sign(payload, key.public_key, { expiresIn: '15m' });
    const refresh_token = jwt.sign(payload, key.private_key, { expiresIn: '1h' });

    return {
      access_token,
      refresh_token
    };
  } catch (error) {
    console.log('Error creating pair token', error);
    throw new CustomError('Could not create token', STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};
