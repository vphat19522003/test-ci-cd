import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query';

import {
  AddNewCategoryFormCustom,
  EditCategoryFormType
} from '@app/pages/admin/ecommerce/categoryPage/components/schemas';
import { ResultResponseType } from '@app/types/auth';
import { CustomCategoryResponseType } from '@app/types/category';
import { IErrorResponse, ResponseType } from '@app/types/common';

import {
  createCategory,
  deleteCategory,
  editCategory,
  getListCategory,
  getMainCategory,
  getSubCategory
} from '../category';

export const useGetMainCategory = (enabled = true): UseQueryResult<CustomCategoryResponseType[]> => {
  return useQuery({
    queryKey: ['mainCategory'],
    queryFn: getMainCategory,
    enabled: enabled
  });
};

export const useGetListCategory = (): UseQueryResult<CustomCategoryResponseType[]> => {
  return useQuery({
    queryKey: ['listCategory'],
    queryFn: getListCategory
  });
};

export const useGetSubCategory = (): UseMutationResult<CustomCategoryResponseType[], IErrorResponse, string> => {
  return useMutation({
    mutationFn: getSubCategory
  });
};

export const useCreateCategory = (): UseMutationResult<
  ResultResponseType,
  IErrorResponse,
  AddNewCategoryFormCustom
> => {
  return useMutation({
    mutationFn: createCategory
  });
};

export const useDeleteCategory = (): UseMutationResult<ResponseType, IErrorResponse, string> => {
  return useMutation({
    mutationFn: deleteCategory
  });
};

export const useEditCategory = (): UseMutationResult<ResponseType, IErrorResponse, EditCategoryFormType> => {
  return useMutation({
    mutationFn: editCategory
  });
};
