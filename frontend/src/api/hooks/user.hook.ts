import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query';

import { PersonalInfoType } from '@app/pages/userSetting/userAccount/components/schemas';
import { AddressFormSchemaType } from '@app/pages/userSetting/userAddress/components/schemas';
import { SecurityPasswordType } from '@app/pages/userSetting/userSecurity/components/schemas';
import { ResultResponseType } from '@app/types/auth';
import { IErrorResponse, ResponseType } from '@app/types/common';
import { UserAddressResponseType, UserTypeResponse } from '@app/types/user';

import {
  addAddress,
  changePassword,
  deleteAddress,
  getListAddress,
  getUser,
  setDefaultAddress,
  updateUserAvatar,
  updateUserProfile
} from '../user';

export const useGetUser = (): UseQueryResult<UserTypeResponse> => {
  return useQuery({
    queryKey: ['getUser'],
    queryFn: async () => {
      return getUser();
    }
  });
};

export const useUpdateUserProfile = (): UseMutationResult<ResultResponseType, IErrorResponse, PersonalInfoType> => {
  return useMutation({
    mutationFn: updateUserProfile
  });
};

export const useGetListAddress = (): UseQueryResult<UserAddressResponseType[]> => {
  return useQuery({
    queryKey: ['addressList'],
    queryFn: async () => {
      return getListAddress();
    }
  });
};

export const useDeleteAddress = (): UseMutationResult<ResponseType, IErrorResponse, string> => {
  return useMutation({
    mutationFn: deleteAddress
  });
};

export const useAddAddress = (): UseMutationResult<ResultResponseType, IErrorResponse, AddressFormSchemaType> => {
  return useMutation({
    mutationFn: addAddress
  });
};

export const useSetDefaultAddress = (): UseMutationResult<ResultResponseType, IErrorResponse, string> => {
  return useMutation({
    mutationFn: setDefaultAddress
  });
};

export const useChangePassword = (): UseMutationResult<ResponseType, IErrorResponse, SecurityPasswordType> => {
  return useMutation({
    mutationFn: changePassword
  });
};

export const useUpdateUserAvater = (): UseMutationResult<ResultResponseType, IErrorResponse, File> => {
  return useMutation({
    mutationFn: updateUserAvatar
  });
};
