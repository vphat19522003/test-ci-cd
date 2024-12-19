import { Request, Response } from 'express';

import STATUS_CODE from '@app/constants/responseStatus';
import AuthService from '@app/services/auth.service';

export const registerController = async (req: Request, res: Response): Promise<Response> => {
  const result = await AuthService.register(req, res);

  return res.json({
    message: 'Create user successfully',
    result,
    status: STATUS_CODE.OK
  });
};

export const verifyOTPController = async (req: Request, res: Response): Promise<Response> => {
  const result = await AuthService.verifyOTP(req);
  return res.json({
    message: 'Verify OTP successfully',
    status: STATUS_CODE.OK,
    result
  });
};

export const resendOTPController = async (req: Request, res: Response): Promise<Response> => {
  await AuthService.resendOTP(req);
  return res.json({
    message: 'Resend OTP successfully',
    status: STATUS_CODE.OK
  });
};

export const loginController = async (req: Request, res: Response): Promise<Response> => {
  const result = await AuthService.login(req, res);
  return res.json({
    message: 'Login successfully',
    result,
    status: STATUS_CODE.OK
  });
};

export const logoutController = async (req: Request, res: Response): Promise<Response> => {
  await AuthService.logout(req, res);
  return res.json({
    message: 'Logout successfully',
    status: STATUS_CODE.OK
  });
};

export const verifyRefreshTokenController = async (req: Request, res: Response): Promise<Response> => {
  await AuthService.verifyRefreshToken(req, res);

  return res.json({
    message: 'In refresh token',
    status: STATUS_CODE.OK
  });
};
