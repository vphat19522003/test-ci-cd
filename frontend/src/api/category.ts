import axiosCustom from '@app/config/axios';
import {
  AddNewCategoryFormCustom,
  EditCategoryFormType
} from '@app/pages/admin/ecommerce/categoryPage/components/schemas';
import { ResultResponseType } from '@app/types/auth';
import { CustomCategoryResponseType } from '@app/types/category';
import { ResponseType } from '@app/types/common';

export const getMainCategory = async (): Promise<CustomCategoryResponseType[]> => {
  const res = await axiosCustom.get('/category/get-main-category');

  return res.data.result;
};

export const getListCategory = async (): Promise<CustomCategoryResponseType[]> => {
  const res = await axiosCustom.get('/category/get-tree-category');

  return res.data.result;
};

export const getSubCategory = async (parent_id: string): Promise<CustomCategoryResponseType[]> => {
  const res = await axiosCustom.post(`/category/get-sub-category?parent_id=${parent_id}`);

  return res.data.result;
};

export const createCategory = async ({
  name,
  description,
  categoryImg,
  parent
}: AddNewCategoryFormCustom): Promise<ResultResponseType> => {
  const formData = new FormData();

  formData.append('name', name);
  formData.append('description', String(description));

  if (parent) {
    formData.append('parent', parent);
  }

  formData.append('file', categoryImg);

  const res = await axiosCustom.post('/category/create-category', formData, {
    headers: { 'content-Type': 'multipart/form-data' }
  });

  return res.data;
};

export const deleteCategory = async (categoryId: string): Promise<ResponseType> => {
  const res = await axiosCustom.post(`/category/delete-category?category_id=${categoryId}`);

  return res.data;
};

export const editCategory = async ({
  category_id,
  name,
  description,
  categoryImg
}: EditCategoryFormType): Promise<ResultResponseType> => {
  const formData = new FormData();

  if (categoryImg) {
    formData.append('file', categoryImg);
  }

  formData.append('name', name);
  formData.append('description', description);
  formData.append('category_id', category_id);

  const res = await axiosCustom.post('/category/edit-category', formData, {
    headers: { 'content-Type': 'multipart/form-data' }
  });

  return res.data;
};
