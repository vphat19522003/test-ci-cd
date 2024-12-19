import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';

import STATUS_CODE from '@app/constants/responseStatus';
import { CustomError } from '@app/core/response.error';
import { CategoryInfo } from '@app/repository/category.repository';
import CategoryService from '@app/services/category.service';
import { IProduct } from '@app/services/product/type';

const verifyCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { category } = req.body as IProduct;

  try {
    if (!Types.ObjectId.isValid(category)) throw new CustomError('Category is not valid type', STATUS_CODE.BAD_REQUEST);

    const categoryType = (await CategoryService.findTopParentCategory(category as unknown as string)) as CategoryInfo;

    if (!categoryType) throw new CustomError('Category not found', STATUS_CODE.BAD_REQUEST);

    req.body.categoryType = categoryType.name;

    next();
  } catch (error) {
    next(error);
  }
};

export default verifyCategory;
