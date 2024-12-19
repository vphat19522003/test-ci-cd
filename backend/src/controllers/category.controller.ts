import { Request, Response } from 'express';

import STATUS_CODE from '@app/constants/responseStatus';
import CategoryService from '@app/services/category.service';

export const createCategoryController = async (req: Request, res: Response): Promise<Response> => {
  const result = await CategoryService.createCategory(req);

  return res.json({
    message: 'Create category successfully',
    status: STATUS_CODE.OK,
    result
  });
};

export const getMainCategoryController = async (req: Request, res: Response): Promise<Response> => {
  const result = await CategoryService.getMainCategory();

  return res.json({
    message: 'Get list main category successfully',
    status: STATUS_CODE.OK,
    result
  });
};

export const getSubCategoryController = async (req: Request, res: Response): Promise<Response> => {
  const result = await CategoryService.getSubCategory(req);

  return res.json({
    message: 'Get list sub category successfully',
    status: STATUS_CODE.OK,
    result
  });
};

export const deleteCategoryController = async (req: Request, res: Response): Promise<Response> => {
  await CategoryService.deleteCategory(req);

  return res.json({
    message: 'Delete category successfully',
    status: STATUS_CODE.OK
  });
};

export const getTreeCategoryController = async (req: Request, res: Response): Promise<Response> => {
  const result = await CategoryService.getTreeCategory(req);

  return res.json({
    message: 'Get tree category successfully',
    status: STATUS_CODE.OK,
    result
  });
};

export const editCategoryController = async (req: Request, res: Response): Promise<Response> => {
  const result = await CategoryService.editCategory(req);

  return res.json({
    message: 'Edit category successfully',
    status: STATUS_CODE.OK,
    result
  });
};
