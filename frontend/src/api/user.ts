import axiosCustom from '@app/config/axios';
import { PersonalInfoType } from '@app/pages/userSetting/userAccount/components/schemas';
import { AddressFormSchemaType } from '@app/pages/userSetting/userAddress/components/schemas';
import { SecurityPasswordType } from '@app/pages/userSetting/userSecurity/components/schemas';
import { ResultResponseType } from '@app/types/auth';
import { ResponseType } from '@app/types/common';
import { UserAddressResponseType, UserTypeResponse } from '@app/types/user';

export const getUser = async (): Promise<UserTypeResponse> => {
  const res = await axiosCustom.get('/user/get-user');
  return res.data.result;
};

export const updateUserProfile = async ({
  fullName,
  gender,
  passport,
  phone
}: PersonalInfoType): Promise<ResultResponseType> => {
  const res = await axiosCustom.post('/user/update-user', { fullName, gender, passport, phone });

  return res.data;
};

export const getListAddress = async (): Promise<UserAddressResponseType[]> => {
  const res = await axiosCustom.get('/user/get-list-address');

  return res.data.result;
};

export const deleteAddress = async (addressId: string): Promise<ResponseType> => {
  const res = await axiosCustom.post(`/user/delete-address?address_id=${addressId}`);

  return res.data;
};

export const addAddress = async ({
  district,
  province,
  street,
  type,
  ward
}: AddressFormSchemaType): Promise<ResultResponseType> => {
  const res = await axiosCustom.post('/user/add-address', {
    address_city: province,
    address_district: district,
    address_ward: ward,
    address_street: street,
    address_type: type
  });

  return res.data;
};

export const setDefaultAddress = async (addressId: string): Promise<ResultResponseType> => {
  const res = await axiosCustom.post(`/user/set-default-address?address_id=${addressId}`);
  return res.data;
};

export const changePassword = async ({ current_password, password }: SecurityPasswordType): Promise<ResponseType> => {
  const res = await axiosCustom.post('/user/change-password', {
    current_password,
    password
  });
  return res.data;
};

export const updateUserAvatar = async (file: File): Promise<ResultResponseType> => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await axiosCustom.post('/user/upload-avatar', formData, {
    headers: { 'content-Type': 'multipart/form-data' }
  });

  return res.data;
};
