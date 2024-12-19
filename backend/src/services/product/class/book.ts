import STATUS_CODE from '@app/constants/responseStatus';
import { CustomError } from '@app/core/response.error';
import { BookProductModel } from '@app/models/product.model';

import { IBook, IBookStrategy } from '../type';
import Product from './product';

class Book extends Product implements IBookStrategy {
  productId: string;
  author: string;
  page_number: number;
  publisher: string;
  subCategory: string;

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
    isDeleted,
    author,
    page_number,
    productId,
    publisher,
    subCategory
  }: IBook) {
    super({
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
    });
    this.author = author;
    this.page_number = page_number;
    this.productId = productId;
    this.publisher = publisher;
    this.subCategory = subCategory;
  }

  async createProduct(): Promise<IBook> {
    const session = await BookProductModel.startSession();
    let newBook = {} as IBook;
    try {
      await session.withTransaction(async () => {
        const createProduct = await super.createProduct(session);
        const createBook = await BookProductModel.create([{ ...this, productId: createProduct._id }], { session });

        newBook = {
          ...createProduct,
          ...createBook[0].toObject()
        } as unknown as IBook;
      });
      return newBook;
    } catch (error) {
      throw new CustomError(`Error when create book ${error}`, STATUS_CODE.BAD_REQUEST);
    } finally {
      await session.endSession();
    }
  }
}

export default Book;
