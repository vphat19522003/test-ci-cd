import { omit } from 'lodash';
import mongoose, { Types } from 'mongoose';

import STATUS_CODE from '@app/constants/responseStatus';
import { CustomError } from '@app/core/response.error';
import CategoryModel, { CategoryImageType, ICategory } from '@app/models/category.model';

export type CategoryInfo = {
  _id?: string | Types.ObjectId;
  name: string;
  description?: string;
  categoryImg: CategoryImageType;
  parent?: string;
  child?: [string];
};

class CategoryRepository {
  static async createCategory({ name, description, categoryImg, parent }: CategoryInfo): Promise<CategoryInfo> {
    try {
      const newCategory = await CategoryModel.create({
        name,
        description,
        categoryImg,
        parent
      });

      return newCategory.toObject<CategoryInfo>();
    } catch (e) {
      throw new CustomError('Can not create category', STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
  }

  static async getMainCategory(name?: string): Promise<CategoryInfo[]> {
    const filter: { parent: null; name?: { $regex: string; $options: string } } = { parent: null };
    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }

    const listMainCategory = await CategoryModel.find(filter)
      .populate({
        path: 'child',
        select: 'name description categoryImg'
      })
      .lean();

    return listMainCategory as unknown as CategoryInfo[];
  }

  static async getSubCategory(parent_id: string): Promise<CategoryInfo[]> {
    const listMainCategory = await CategoryModel.find({ parent: parent_id }).lean();
    return listMainCategory as unknown as CategoryInfo[];
  }

  static async deleteCategory(category_id: string): Promise<mongoose.mongo.DeleteResult> {
    const subCategories = await CategoryModel.find({ parent: category_id });

    for (const subCategory of subCategories) {
      await this.deleteCategory(subCategory._id as string);
    }

    const result = await CategoryModel.deleteOne({ _id: new Types.ObjectId(category_id) });

    return result;
  }

  static async getTreeCategory(category_id: string): Promise<unknown> {
    const category = (await CategoryModel.findById(new Types.ObjectId(category_id)).lean()) as any;

    if (!category) {
      throw new CustomError('Category not found', STATUS_CODE.BAD_REQUEST);
    }

    const child = await CategoryModel.find({ parent: new Types.ObjectId(category_id) }).lean();

    if (child.length > 0) {
      category.child = await Promise.all(
        child.map(async (childItem) => {
          return await this.getTreeCategory(childItem._id as string);
        })
      );
    }

    return omit(category, '__v', 'updatedAt');
  }

  static async findTopParentCategory(categoryId: string | mongoose.Types.ObjectId): Promise<ICategory> {
    const category = await CategoryModel.findById(new Types.ObjectId(categoryId)).populate('parent').lean();

    if (!category!.parent) {
      return category as ICategory;
    }

    return this.findTopParentCategory(category!.parent._id);
  }
}

export default CategoryRepository;
