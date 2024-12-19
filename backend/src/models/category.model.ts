import { Document, model, Schema, Types } from 'mongoose';

export interface CategoryImageType {
  category_img_public_id: string;
  category_img_url: string;
}

export interface ICategory extends Document {
  name: string;
  description: string;
  categoryImg: CategoryImageType;
  parent: Types.ObjectId;
  child: [Types.ObjectId];
}

const categoryImageSchema = new Schema<CategoryImageType>(
  {
    category_img_url: { type: String, required: true },
    category_img_public_id: { type: String, required: true }
  },
  { _id: false }
);

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    categoryImg: categoryImageSchema,
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      default: null
    },
    child: [{ type: Schema.Types.ObjectId, ref: 'Category' }]
  },
  {
    timestamps: true
  }
);

const CategoryModel = model<ICategory>('Category', categorySchema);

export default CategoryModel;
