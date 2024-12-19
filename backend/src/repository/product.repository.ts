import { Types } from 'mongoose';

import ProductModel from '@app/models/product.model';
import { IProduct } from '@app/services/product/type';

class ProductRepository {
  static async GetLatestBookWithQuantity({
    bookCategoryId,
    quantity
  }: {
    bookCategoryId: string;
    quantity: number;
  }): Promise<IProduct[]> {
    const latestProduct = await ProductModel.aggregate([
      { $match: { category: new Types.ObjectId(bookCategoryId), isDeleted: false } },
      { $sort: { createdAt: -1 } },
      { $limit: Number(quantity) },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: 'productId',
          as: 'bookDetails'
        }
      },
      { $unwind: { path: '$bookDetails', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 1,
          productName: 1,
          productPrice: 1,
          productThumbImg: 1,
          description: 1,
          createdAt: 1,
          author: '$bookDetails.author',
          page_number: '$bookDetails.page_number',
          publisher: '$bookDetails.publisher'
        }
      }
    ]);

    return latestProduct as IProduct[];
  }
}

export default ProductRepository;
