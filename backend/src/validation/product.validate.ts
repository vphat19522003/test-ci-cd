import { Request } from 'express';
import { Types } from 'mongoose';

const { body } = require('express-validator');

const productValidators = {
  createProduct: [
    body('productName')
      .isString()
      .withMessage('Product name must be a string')
      .isLength({ min: 3 })
      .withMessage('Product name must have at least 3 characters'),
    body('productPrice').isFloat({ min: 10000 }).withMessage('Price must be at least 10.000'),
    body('description')
      .isString()
      .withMessage('Description must be a string')
      .isLength({ min: 5 })
      .withMessage('Description must have at least 5 characters'),
    body('category').notEmpty().withMessage('Category is required'),
    body('createdBy')
      .notEmpty()
      .withMessage('Created By is required')
      .custom(async (value: string) => {
        if (!Types.ObjectId.isValid(value)) {
          throw new Error('Created By data type is not valid');
        }
      }),
    body('stockQuantity').isInt({ min: 2 }).withMessage('stockQuantity must be greater than 1'),

    // Xác thực điều kiện dựa trên loại danh mục
    body('author')
      .if((value: unknown, { req }: { req: Request }) => req.body.categoryType === 'Book')
      .notEmpty()
      .withMessage('Author is required with books')
      .isString()
      .withMessage('Author must be string'),
    body('page_number')
      .if((value: unknown, { req }: { req: Request }) => req.body.categoryType === 'Book')
      .notEmpty()
      .withMessage('Page number is required with books')
      .isInt({ min: 5 })
      .withMessage('Page number must at least 5 pages'),
    body('publisher')
      .if((value: unknown, { req }: { req: Request }) => req.body.categoryType === 'Book')
      .notEmpty()
      .withMessage('Publisher is required with books')
      .isString()
      .withMessage('Publisher must be string')
  ],

  updateProduct: [
    body('productName').optional().isString().withMessage('Product name must be a string'),
    body('productPrice').optional().isFloat({ min: 0 }).withMessage('Product price must be a positive number'),
    body('description')
      .optional()
      .isString()
      .withMessage('Description must be a string')
      .isLength({ min: 5 })
      .withMessage('Description must be at least 5 characters')
  ]
};

export default productValidators;
