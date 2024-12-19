import mongoose, { Document, model, Schema } from 'mongoose';

export interface ProductImgType {
  public_id: string;
  url: string;
}

interface IProduct extends Document {
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

interface IBookProduct extends Document {
  productId: mongoose.Types.ObjectId;
  author: string;
  page_number: number;
  publisher: string;
  subCategory: mongoose.Types.ObjectId;
}

const productImgSchema = new Schema<ProductImgType>(
  {
    url: { type: String, required: true },
    public_id: { type: String, required: true }
  },
  { _id: false }
);

const productSchemas = new Schema<IProduct>(
  {
    productName: {
      type: String,
      required: true
    },
    productPrice: {
      type: Number,
      required: true
    },
    productThumbImg: { type: productImgSchema, required: true },
    description: {
      type: String,
      required: true
    },
    productDescImg: { type: [productImgSchema], required: true, default: [] },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    productVoteRate: {
      type: Number,
      default: 0
    },
    stockQuantity: {
      type: Number,
      required: true,
      default: 0
    },
    soldQuantity: {
      type: Number,
      default: 0
    },
    availableQuantity: {
      type: Number,
      default: 0
    },
    totalComment: {
      type: Number,
      default: 0
    },
    tag: {
      type: [String],
      default: []
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const bookSchemas = new Schema<IBookProduct>({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  author: {
    type: String,
    required: true
  },
  page_number: {
    type: Number,
    required: true
  },
  publisher: {
    type: String,
    required: true
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
});

const ProductModel = model<IProduct>('Product', productSchemas);
export const BookProductModel = model<IBookProduct>('Book', bookSchemas);

export default ProductModel;
