import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query';

import { IErrorResponse } from '@app/types/common';
import { locationResponseType } from '@app/types/user';

import { getDistricts, getProvinces, getWards } from '../location';

export const useGetProvinces = (): UseQueryResult<locationResponseType[]> => {
  return useQuery({
    queryKey: ['PronvinceList'],
    queryFn: async () => {
      return getProvinces();
    }
  });
};

export const useGetDistricts = (): UseMutationResult<locationResponseType[], IErrorResponse, string> => {
  return useMutation({
    mutationFn: getDistricts
  });
};

export const useGetWards = (): UseMutationResult<locationResponseType[], IErrorResponse, string> => {
  return useMutation({
    mutationFn: getWards
  });
};
