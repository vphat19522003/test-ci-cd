import axiosCustom from '@app/config/axios';
import { locationResponseType } from '@app/types/user';

export const getProvinces = async (): Promise<locationResponseType[]> => {
  const res = await axiosCustom.get('/location/get-province');

  return res.data.result;
};

export const getDistricts = async (province_code: string): Promise<locationResponseType[]> => {
  const res = await axiosCustom.post(`/location/get-district?province_code=${province_code}`);

  return res.data.result;
};

export const getWards = async (district_code: string): Promise<locationResponseType[]> => {
  const res = await axiosCustom.post(`/location/get-ward?district_code=${district_code}`);

  return res.data.result;
};
