import axiosCustom from '@app/config/axios';
import {
  AddNewProductFormCustom,
  getProductDetailCustom,
  getProductTypeCustom
} from '@app/pages/admin/ecommerce/addNewProductPage/components/schemas';
import { initialFilterStateType } from '@app/redux/filterSlice';
import { ProductResultResponseType, ResultResponseType } from '@app/types/auth';

export const createProduct = async ({
  productName,
  productPrice,
  description,
  stockQuantity,
  productThumbImg,
  productDescImg,
  category,
  categoryLabel,
  author,
  page_number,
  publisher,
  createdBy,
  subCategory
}: AddNewProductFormCustom): Promise<ResultResponseType> => {
  const formData = new FormData();

  formData.append('productName', productName);
  formData.append('productPrice', String(productPrice));
  formData.append('description', description);
  formData.append('stockQuantity', String(stockQuantity));
  formData.append('thumbImg', productThumbImg);

  productDescImg.forEach((file) => {
    formData.append('descImg', file);
  });

  formData.append('category', category);

  if (categoryLabel === 'Book') {
    formData.append('author', author as string);
    formData.append('page_number', String(page_number || 0));
    formData.append('publisher', publisher as string);
    formData.append('subCategory', String(subCategory));
  }

  formData.append('createdBy', createdBy as string);

  const res = await axiosCustom.post('/product/create-product', formData, {
    headers: { 'content-Type': 'multipart/form-data' }
  });

  return res.data;
};

export const getAllLatestProduct = async (quantity: number): Promise<getProductTypeCustom[]> => {
  const res = await axiosCustom.get(`/product/get-all-latest-products?quantity=${quantity}`);

  return res.data.result;
};

export const getProductDetail = async (productId: string): Promise<getProductDetailCustom> => {
  const res = await axiosCustom.get(`/product/get-product-detail?productId=${productId}`);

  return res.data.result;
};

export const getProductByFilter = async ({
  mainCategory,
  subCategory,
  minPrice,
  maxPrice,
  page,
  pageSize,
  rating,
  sort
}: initialFilterStateType & { page: number; pageSize: number }): Promise<ProductResultResponseType> => {
  const res = await axiosCustom.post('/product/get-product-by-filter', {
    mainCategory,
    subCategory,
    minPrice,
    maxPrice,
    page,
    pageSize,
    rating,
    sort
  });

  return res.data;
};
