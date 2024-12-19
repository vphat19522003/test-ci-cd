import axiosCustom from '@app/config/axios';
import { LoginSchemaType } from '@app/pages/login/schemas';
import { UserInfoValidType } from '@app/pages/signUp/userInformation/schema';
import { VerifyOTPValidateType } from '@app/pages/signUp/verifyOTP/schema';
import { ResultResponseType } from '@app/types/auth';
import { ResponseType } from '@app/types/common';

export const login = async ({ username, password }: LoginSchemaType): Promise<ResultResponseType> => {
  const res = await axiosCustom.post('/auth/login', { username, password });
  return res.data;
};

export const signUp = async ({
  email,
  password,
  username
}: Omit<UserInfoValidType, 'confirmPassword'>): Promise<ResultResponseType> => {
  const res = await axiosCustom.post('/auth/register', {
    email,
    password,
    username
  });

  return res.data;
};

export const verifyOTP = async ({ code: verify_otp, email }: VerifyOTPValidateType): Promise<ResultResponseType> => {
  const res = await axiosCustom.post('/auth/verify-otp', {
    verify_otp,
    email
  });

  return res.data;
};

export const resendOTP = async (): Promise<ResponseType> => {
  const res = await axiosCustom.post('/auth/resend-otp');
  return res.data;
};

export const logOut = async (): Promise<ResponseType> => {
  const res = await axiosCustom.post('/auth/logout');
  return res.data;
};
