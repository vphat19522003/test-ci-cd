import { Request } from 'express';
import { omit } from 'lodash';
import mongoose, { Types } from 'mongoose';

import STATUS_CODE from '@app/constants/responseStatus';
import { CustomError } from '@app/core/response.error';
import CategoryModel from '@app/models/category.model';
import CategoryRepository, { CategoryInfo } from '@app/repository/category.repository';
import cloudinary, { uploadToCloudinary } from '@app/utils/cloudinaryConfig';
import { isValidImage } from '@app/utils/validateFileType.util';

class CategoryService {
  static async createCategory(req: Request): Promise<CategoryInfo> {
    const { name, description, parent } = req.body;
    const file = req.file;
    const folder = `category/${name}`;

    if (!name) throw new CustomError('No name provided', STATUS_CODE.BAD_REQUEST);

    if (!file) throw new CustomError('No file provided', STATUS_CODE.BAD_REQUEST);

    if (!isValidImage(file)) throw new CustomError("File doesn't have valid type", STATUS_CODE.BAD_REQUEST);

    const isExistName = await CategoryModel.findOne({ name });
    if (isExistName) throw new CustomError('Category Name is already existed', STATUS_CODE.BAD_REQUEST);

    if (parent) {
      const parentCategory = await CategoryModel.findById(parent);
      if (!parentCategory) throw new CustomError('Parent category not found', STATUS_CODE.BAD_REQUEST);
    }

    let newCategory;

    try {
      // Upload ảnh lên Cloudinary
      const uploadResult = await uploadToCloudinary(file, folder);

      // Tạo category mới
      newCategory = await CategoryRepository.createCategory({
        name,
        description,
        parent: parent || null,
        categoryImg: {
          category_img_url: uploadResult.url,
          category_img_public_id: uploadResult.public_id
        }
      });

      if (!newCategory) throw new CustomError('Failed to create category', STATUS_CODE.INTERNAL_SERVER_ERROR);

      if (parent) {
        await CategoryModel.findByIdAndUpdate(parent, { $push: { child: newCategory._id } }, { new: true });
      }

      return omit(newCategory, '__v', 'updatedAt');
    } catch (error) {
      if (newCategory) {
        await CategoryModel.findByIdAndDelete(newCategory._id);
      }

      throw new CustomError('Failed to upload avatar', STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
  }

  static async getMainCategory(name?: string): Promise<CategoryInfo[]> {
    const listCategory = await CategoryRepository.getMainCategory(name);
    return listCategory.map((category) => omit(category, '__v', 'updatedAt'));
  }

  static async getSubCategory(req: Request): Promise<CategoryInfo[]> {
    const { parent_id } = req.query;

    if (!parent_id) throw new CustomError('No parent ID provided', STATUS_CODE.BAD_REQUEST);

    const listSubCategory = await CategoryRepository.getSubCategory(parent_id as string);
    return listSubCategory.map((category) => omit(category, '__v', 'updatedAt'));
  }

  static async deleteCategory(req: Request): Promise<void> {
    const { category_id } = req.query;
    let parentCategory: string | Types.ObjectId = '';

    if (!category_id) throw new CustomError('No category ID provided', STATUS_CODE.BAD_REQUEST);
    try {
      const category = await CategoryModel.findById(new Types.ObjectId(category_id as string));

      if (!category) throw new CustomError('No category found', STATUS_CODE.BAD_REQUEST);

      parentCategory = category.parent;

      const result = (await CategoryRepository.deleteCategory(category_id as string)) as mongoose.mongo.DeleteResult;

      if (result.deletedCount !== 1)
        throw new CustomError('Failed to delete category', STATUS_CODE.INTERNAL_SERVER_ERROR);
      else {
        if (parentCategory)
          await CategoryModel.findByIdAndUpdate(
            parentCategory,
            {
              $pull: { child: category_id }
            },
            {
              new: true
            }
          );
      }
    } catch (error) {
      throw new CustomError('Failed to delete category', STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
  }

  static async getTreeCategory(req: Request): Promise<unknown> {
    const { category_id } = req.query;
    let listCategoryId: string[] = [];
    const categoryTree = [];

    if (!category_id) {
      let tempArr = [];

      tempArr = await this.getMainCategory();

      if (tempArr.length > 0) listCategoryId = tempArr.map((category) => category._id) as string[];
    } else {
      listCategoryId.push(category_id as string);
    }

    for (let idx = 0; idx < listCategoryId.length; idx++) {
      const categoryTreeItem = await CategoryRepository.getTreeCategory(listCategoryId[idx] as string);
      categoryTree.push(categoryTreeItem);
    }

    return categoryTree;
  }

  static async findTopParentCategory(categoryId: string): Promise<unknown> {
    if (!categoryId) throw new CustomError('No provided categoryID', STATUS_CODE.BAD_REQUEST);

    const findCategory = await CategoryModel.findById(new Types.ObjectId(categoryId));

    if (!findCategory) throw new CustomError('Not found category', STATUS_CODE.BAD_REQUEST);

    const category = await CategoryRepository.findTopParentCategory(categoryId);

    return category;
  }

  static async editCategory(req: Request): Promise<CategoryInfo> {
    const { category_id, name, description } = req.body;
    const file = req.file;
    const folder = `category/${name}`;
    let updatedCategory;

    if (!category_id) throw new CustomError('No category ID provided', STATUS_CODE.BAD_REQUEST);

    const category = await CategoryModel.findById(new Types.ObjectId(category_id)).lean();
    if (!category) throw new CustomError('Not found category', STATUS_CODE.BAD_REQUEST);

    try {
      if (file) {
        const uploadResult = await uploadToCloudinary(file, folder);

        if (category.categoryImg?.category_img_public_id) {
          await cloudinary.uploader.destroy(category.categoryImg.category_img_public_id);
        }

        updatedCategory = await CategoryModel.findByIdAndUpdate(
          category._id,
          {
            $set: {
              name,
              description,
              categoryImg: {
                category_img_url: uploadResult.url,
                category_img_public_id: uploadResult.public_id
              }
            }
          },
          { new: true }
        );
      } else {
        updatedCategory = await CategoryModel.findByIdAndUpdate(
          category._id,
          { $set: { name, description } },
          { new: true }
        );
      }

      if (!updatedCategory) throw new CustomError("Category can't be updated", STATUS_CODE.INTERNAL_SERVER_ERROR);

      return updatedCategory.toObject<CategoryInfo>();
    } catch (error) {
      throw new CustomError('Failed to update category', STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
  }

  static async getCategoryById(id: string): Promise<CategoryInfo> {
    if (!id) throw new CustomError('No category id provided', STATUS_CODE.BAD_REQUEST);

    const category = await CategoryModel.findById(new Types.ObjectId(id));

    if (!category) throw new CustomError('Category not found', STATUS_CODE.NOT_FOUND);

    return category.toObject<CategoryInfo>();
  }
}

export default CategoryService;
