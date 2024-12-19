import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { Request, Response } from 'express';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { omit } from 'lodash';
import mongoose, { Types } from 'mongoose';

import STATUS_CODE from '@app/constants/responseStatus';
import {
  ACCESS_TOKEN_EXPIRED,
  ACCESS_TOKEN_TIME,
  REFRESH_TOKEN_EXPIRED,
  REFRESH_TOKEN_TIME
} from '@app/constants/tokenProperty';
import { CustomError } from '@app/core/response.error';
import { IRequestCustom } from '@app/middleware/accessToken.middleware';
import KeyModel from '@app/models/key.model';
import OTPModel from '@app/models/otp.model';
import UserModel from '@app/models/user.model';
import UserRepository, { UserInfo } from '@app/repository/user.repository';
import { createPairToken } from '@app/utils/token.util';

import KeyService from './key.service';
import OTPService from './otp.service';

class AuthService {
  static async register(req: Request, res: Response): Promise<Omit<UserInfo, 'password'>> {
    const { username, email, password } = req.body;

    //Check exist email and username
    const existEmail = await UserRepository.findUserByEmail({ email });
    if (existEmail) throw new CustomError('Email is already exist', STATUS_CODE.BAD_REQUEST);

    const existUsername = await UserRepository.findUserByUsername({ username });
    if (existUsername) throw new CustomError('Username is already exists', STATUS_CODE.BAD_REQUEST);

    // Hash the password
    const saltRounds = await bcrypt.genSalt(10); // Number of salt rounds to use for hashing
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userCreated = await UserRepository.createUser({ username, email, password: hashedPassword });

    //generate key
    const public_key = randomBytes(64).toString('hex');
    const private_key = randomBytes(64).toString('hex');

    const { access_token, refresh_token } = createPairToken({
      payload: {
        _id: userCreated._id as string,
        email: userCreated.email,
        username: userCreated.username,
        isVerified: userCreated.isVerified as boolean
      },
      key: {
        public_key,
        private_key
      }
    });

    await KeyService.createUserKey({
      userId: userCreated._id as string,
      public_key,
      private_key,
      access_token,
      refresh_token
    });

    res.cookie('access_token', access_token, {
      maxAge: ACCESS_TOKEN_TIME,
      expires: ACCESS_TOKEN_EXPIRED,
      secure: process.env.NODE_ENV !== 'development',
      httpOnly: false,
      sameSite: 'strict'
    });

    res.cookie('refresh_token', refresh_token, {
      maxAge: REFRESH_TOKEN_TIME,
      expires: REFRESH_TOKEN_EXPIRED,
      secure: process.env.NODE_ENV !== 'development',
      httpOnly: false,
      sameSite: 'strict'
    });

    res.cookie('client_id', userCreated._id?.toString(), {
      maxAge: REFRESH_TOKEN_TIME,
      expires: REFRESH_TOKEN_EXPIRED,
      secure: process.env.NODE_ENV !== 'development',
      httpOnly: false,
      sameSite: 'strict'
    });

    const otp = await OTPService.generateOTP({ userId: userCreated._id as string, email: userCreated.email });

    if (otp) {
      await OTPService.sendOTP(otp);
    } else {
      throw new CustomError('Error generating OTP', STATUS_CODE.INTERNAL_SERVER_ERROR);
    }

    return omit(userCreated, 'password');
  }

  static async login(req: Request, res: Response): Promise<Omit<UserInfo, 'password'>> {
    const { username, password } = req.body;

    const user = await UserRepository.findUserByUsername({ username });

    if (!user) throw new CustomError('User not found', STATUS_CODE.BAD_REQUEST);

    const comparePass = bcrypt.compareSync(password, user.password);
    if (!comparePass) throw new CustomError('Wrong password', STATUS_CODE.BAD_REQUEST);

    const private_key = randomBytes(64).toString('hex');
    const public_key = randomBytes(64).toString('hex');

    const { access_token, refresh_token } = createPairToken({
      payload: {
        _id: user._id as string,
        email: user.email,
        isVerified: user.isVerified as boolean,
        username: user.username
      },
      key: {
        private_key,
        public_key
      }
    });
    const oldKeyStore = await KeyModel.findOneAndDelete({ userId: user._id }).lean();

    await KeyModel.findOneAndUpdate(
      { userId: new Types.ObjectId(user?._id) },

      {
        $set: { access_token, public_key, private_key, refresh_token },
        $addToSet: { used_refresh_tokens: oldKeyStore?.refresh_token }
      },
      { upsert: true, new: true }
    ).lean();

    res.cookie('access_token', access_token, {
      maxAge: ACCESS_TOKEN_TIME,
      expires: ACCESS_TOKEN_EXPIRED,
      secure: process.env.NODE_ENV !== 'development',
      httpOnly: false,
      sameSite: 'strict'
    });

    res.cookie('refresh_token', refresh_token, {
      maxAge: REFRESH_TOKEN_TIME,
      expires: REFRESH_TOKEN_EXPIRED,
      secure: process.env.NODE_ENV !== 'development',
      httpOnly: false,
      sameSite: 'strict'
    });

    res.cookie('client_id', user._id?.toString(), {
      maxAge: REFRESH_TOKEN_TIME,
      expires: REFRESH_TOKEN_EXPIRED,
      secure: process.env.NODE_ENV !== 'development',
      httpOnly: false,
      sameSite: 'strict'
    });

    return omit(user, 'password', '__v', 'updatedAt');
  }

  static async logout(req: Request, res: Response): Promise<void> {
    const client_id = req.cookies['client_id'];

    if (!client_id) throw new CustomError('Not provided client_id', STATUS_CODE.UNAUTHORIZED);

    console.log('ID day', { client_id });

    const user = await UserRepository.findUserById(client_id);

    if (!user) throw new CustomError('User not found', STATUS_CODE.UNAUTHORIZED);

    await KeyService.deleteKeyByUserId(client_id);

    res.clearCookie('client_id');
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
  }

  static async verifyRefreshToken(req: Request, res: Response): Promise<void> {
    const refresh_token = req.cookies['refresh_token'];
    const client_id = req.cookies['client_id'];

    console.log({ client_id, refresh_token });

    if (!refresh_token || !client_id) {
      throw new CustomError('Unauthorized - no refresh token or client id provided', STATUS_CODE.UNAUTHORIZED);
    }

    // client_id format
    if (!mongoose.Types.ObjectId.isValid(client_id)) {
      throw new CustomError('Invalid client ID format', STATUS_CODE.BAD_REQUEST);
    }

    //find user
    const user = await UserRepository.findUserById(client_id);
    if (!user) throw new CustomError('User not found', STATUS_CODE.UNAUTHORIZED);

    const key = await KeyService.findKeyByUserId(client_id);
    if (!key) {
      throw new CustomError('Token not found', STATUS_CODE.UNAUTHORIZED);
    }

    if (key.used_refresh_tokens?.includes(refresh_token)) {
      throw new CustomError('Refresh token already used', STATUS_CODE.UNAUTHORIZED);
    }

    try {
      jwt.verify(refresh_token, key.private_key);

      const public_key = randomBytes(64).toString('hex');
      const private_key = randomBytes(64).toString('hex');

      const token = createPairToken({
        payload: {
          _id: user._id as string,
          email: user.email,
          username: user.username,
          isVerified: user.isVerified as boolean
        },
        key: {
          private_key,
          public_key
        }
      });

      await KeyModel.findOneAndUpdate(
        { userId: new Types.ObjectId(user?._id) },

        {
          $set: { access_token: token.access_token, public_key }
        },
        { upsert: true, new: true }
      ).lean();

      res.cookie('access_token', token.access_token, {
        maxAge: ACCESS_TOKEN_TIME,
        expires: ACCESS_TOKEN_EXPIRED,
        secure: process.env.NODE_ENV !== 'development',
        httpOnly: false,
        sameSite: 'strict'
      });

      res.cookie('client_id', user._id?.toString(), {
        maxAge: REFRESH_TOKEN_TIME,
        expires: REFRESH_TOKEN_EXPIRED,
        secure: process.env.NODE_ENV !== 'development',
        httpOnly: false,
        sameSite: 'strict'
      });
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new CustomError('Refresh token expired', STATUS_CODE.UNAUTHORIZED);
      }

      if (error instanceof JsonWebTokenError) {
        throw new CustomError('Invalid refresh token', STATUS_CODE.FORBIDDEN);
      }

      throw new CustomError('Unknown error occurred', STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
  }

  static async verifyOTP(req: IRequestCustom): Promise<Omit<UserInfo, 'password'>> {
    const { verify_otp } = req.body;
    console.log({ verify_otp });
    const user = req.user as UserInfo;
    console.log(user.isVerified);
    if (user.isVerified) {
      throw new CustomError('User is already verified', STATUS_CODE.BAD_REQUEST);
    }
    console.log({ user });
    const otp = await OTPService.findOTPByUserId(user._id as string);

    if (!otp) throw new CustomError('OTP Not found', STATUS_CODE.BAD_REQUEST);
    console.log({ otp, verify_otp });

    if (otp.code !== verify_otp) throw new CustomError('Invalid otp code', STATUS_CODE.BAD_REQUEST);

    const currentTime = new Date();
    const expiresAt = otp.expiresAt;

    if (currentTime > expiresAt) {
      await OTPModel.findByIdAndDelete(otp._id);
      throw new CustomError('OTP has been expired', STATUS_CODE.BAD_REQUEST);
    }

    await OTPService.changeStatusOTP(user._id as string);

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: new Types.ObjectId(user?._id) },
      {
        $set: {
          isVerified: true
        }
      },
      { new: true }
    );

    if (!updatedUser) throw new CustomError('User not found or update failed', STATUS_CODE.INTERNAL_SERVER_ERROR);

    return omit(updatedUser?.toObject() as UserInfo, 'password', '__v', 'updatedAt');
  }

  static async resendOTP(req: IRequestCustom): Promise<void> {
    const user = req.user as UserInfo;

    if (user.isVerified) {
      throw new CustomError('User is already verified', STATUS_CODE.BAD_REQUEST);
    }

    await OTPService.deleteOldOTP(user._id as string);

    const newOTP = await OTPService.generateOTP({
      userId: user._id as string,
      email: user.email
    });

    if (newOTP) {
      await OTPService.sendOTP(newOTP);
    } else {
      throw new CustomError('Error generating OTP', STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
  }
}

export default AuthService;
