import * as zod from 'zod';

import { errorMessages } from '@app/constants/errorMessages';
import { zodAlwaysRefine } from '@app/utils/zodAlwaysRefine';

export const imageSchema = zod.string().url();
export const AddNewProductFormSchema = zod
  .object({
    productName: zod.string().min(1, errorMessages.require).min(3, errorMessages.productNameMinLength),
    productPrice: zod
      .number({ invalid_type_error: 'Price must be a number' })
      .positive('Price must be greater than 0')
      .max(999999999, 'Price cannot exceed 999,999,999')
      .refine((value) => Number(value.toFixed(2)) === value, {
        message: 'Price can only have up to 2 decimal places'
      }),
    description: zod.string().min(1, errorMessages.require).min(5, errorMessages.descriptionMinLength),
    stockQuantity: zod.number().positive('Stock quantity must be greater than 0'),
    productThumbImg: imageSchema.refine((value) => value && value.length > 0, {
      message: 'Thumbnail image is required'
    }),
    productDescImg: zodAlwaysRefine(zod.array(imageSchema)),

    category: zod.string().trim().min(1, { message: errorMessages.require }),
    categoryLabel: zod.string().optional(),
    subCategory: zod.string().optional(),
    subCategoryLabel: zod.string().optional(),
    listSubCategory: zod.array(zod.any()).optional(),
    //Book product
    author: zod.string().optional(),
    page_number: zod.number().optional(),
    publisher: zod.string().optional()
  })
  .superRefine((data, ctx) => {
    if (data.categoryLabel === 'Book') {
      if (!data.author || data.author.trim() === '') {
        ctx.addIssue({
          code: 'custom',
          path: ['author'],
          message: errorMessages.require
        });
      }

      if (data.page_number === undefined) {
        ctx.addIssue({ code: 'custom', path: ['page_number'], message: errorMessages.require });
      } else {
        if (data.page_number <= 0) {
          ctx.addIssue({ code: 'custom', path: ['page_number'], message: 'Price must be greater than 0' });
        } else if (data.page_number <= 5) {
          ctx.addIssue({ code: 'custom', path: ['page_number'], message: 'Page number must be greater than 5' });
        }
      }

      if (!data.publisher || data.publisher.trim() === '') {
        ctx.addIssue({ code: 'custom', path: ['publisher'], message: errorMessages.require });
      }
    }
    if (data.listSubCategory && data.listSubCategory.length > 0) {
      if (data.subCategory?.trim() === '')
        ctx.addIssue({
          code: 'custom',
          path: ['subCategory'],
          message: 'Sub category is required.'
        });
    }
  });

export type AddNewProductFormType = zod.infer<typeof AddNewProductFormSchema>;
export type AddNewProductFormCustom = Omit<AddNewProductFormType, 'productThumbImg' | 'productDescImg'> & {
  productThumbImg: File;
  productDescImg: File[];
  createdBy?: string;
};

export type getProductTypeCustom = Omit<AddNewProductFormType, 'productThumbImg' | 'productDescImg'> & {
  _id: string;
  productThumbImg: {
    url: string;
    public_id: string;
  };
  productDescImg: {
    url: string;
    public_id: string;
  }[];
  createdBy?: string;
};

export type getProductDetailCustom = Omit<AddNewProductFormType, 'productThumbImg' | 'productDescImg'> & {
  _id: string;
  productThumbImg: {
    url: string;
    public_id: string;
  };
  productDescImg: {
    url: string;
    public_id: string;
  }[];
  createdBy?: string;
  category: {
    _id: string;
    name: string;
  };
  totalComment: number;
  productVoteRate: number;
};
