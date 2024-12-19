import mongoose, { Types } from 'mongoose';

import ProductModel, { ProductImgType } from '@app/models/product.model';

import { IProduct, IProductStrategy } from '../type';

class Product implements IProductStrategy {
  _id?: string | undefined;
  productName: string;
  productPrice: number;
  productThumbImg: ProductImgType;
  description: string;
  productDescImg: ProductImgType[];
  category: Types.ObjectId;
  productVoteRate: number;
  stockQuantity: number;
  soldQuantity: number;
  availableQuantity: number;
  totalComment: number;
  tag: string[];
  createdBy: Types.ObjectId;
  isDeleted: boolean;

  constructor({
    productName,
    productPrice,
    productThumbImg,
    description,
    productDescImg,
    category,
    productVoteRate,
    stockQuantity,
    soldQuantity,
    availableQuantity,
    totalComment,
    tag,
    createdBy,
    isDeleted
  }: IProduct) {
    this.productName = productName;
    this.productPrice = productPrice;
    this.productThumbImg = productThumbImg;
    this.description = description;
    this.productDescImg = productDescImg;
    this.category = category;
    this.productVoteRate = productVoteRate;
    this.stockQuantity = stockQuantity;
    this.soldQuantity = soldQuantity;
    this.availableQuantity = availableQuantity;
    this.totalComment = totalComment;
    this.tag = tag;
    this.createdBy = createdBy;
    this.isDeleted = isDeleted;
  }

  async createProduct(session?: mongoose.ClientSession): Promise<IProduct> {
    if (session) {
      const createdProduct = await ProductModel.create(
        [
          {
            ...this
          }
        ],
        { session }
      );

      return createdProduct[0].toObject() as unknown as IProduct;
    } else {
      const createdProduct = await ProductModel.create({
        ...this
      });

      return createdProduct.toObject() as unknown as IProduct;
    }
  }
}

export default Product;
