import { useMutation, type UseMutationResult } from '@tanstack/react-query';

import { LoginSchemaType } from '@app/pages/login/schemas';
import { UserInfoValidType } from '@app/pages/signUp/userInformation/schema';
import { VerifyOTPValidateType } from '@app/pages/signUp/verifyOTP/schema';
import { ResultResponseType } from '@app/types/auth';
import { IErrorResponse, ResponseType } from '@app/types/common';

import { login, logOut, resendOTP, signUp, verifyOTP } from '../auth';

export const useLogin = (): UseMutationResult<ResultResponseType, IErrorResponse, LoginSchemaType> => {
  return useMutation({
    mutationFn: login
  });
};

export const useSignUp = (): UseMutationResult<
  ResultResponseType,
  IErrorResponse,
  Omit<UserInfoValidType, 'confirmPassword'>
> => {
  return useMutation({
    mutationFn: signUp
  });
};

export const useVerifyOTP = (): UseMutationResult<ResultResponseType, IErrorResponse, VerifyOTPValidateType> => {
  return useMutation({
    mutationFn: verifyOTP
  });
};

export const useResendOTP = (): UseMutationResult<ResponseType, IErrorResponse, unknown> => {
  return useMutation({
    mutationFn: resendOTP
  });
};

export const useLogOut = (): UseMutationResult<ResponseType, IErrorResponse, unknown> => {
  return useMutation({
    mutationFn: logOut
  });
};
