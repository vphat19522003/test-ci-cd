import mongoose from 'mongoose';

import { ProductImgType } from '@app/models/product.model';

export interface IProduct {
  _id?: string;
  productName: string;
  productPrice: number;
  productThumbImg: ProductImgType;
  description: string;
  productDescImg: Array<ProductImgType>;
  category: mongoose.Types.ObjectId;
  productVoteRate: number;
  stockQuantity: number;
  soldQuantity: number;
  availableQuantity: number;
  totalComment: number;
  tag: Array<string>;
  createdBy: mongoose.Types.ObjectId;
  isDeleted: boolean;
}

export type CustomIProduct = Omit<IProduct, 'category'> & {
  category: {
    _id: string;
    name: string;
  };
};

export interface IProductStrategy extends IProduct {
  createProduct: (session?: mongoose.ClientSession) => Promise<IProduct>;
}

export interface IBook extends IProduct {
  productId: string;
  author: string;
  page_number: number;
  publisher: string;
  subCategory: string;
}

export interface IBookStrategy extends IProduct {
  createProduct: (session?: mongoose.ClientSession) => Promise<IBook>;
}
