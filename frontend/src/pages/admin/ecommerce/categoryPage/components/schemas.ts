import * as zod from 'zod';

import { errorMessages } from '@app/constants/errorMessages';

import { imageSchema } from '../../addNewProductPage/components/schemas';

export const AddNewCategoryFormSchema = zod.object({
  name: zod.string().min(1, errorMessages.require).min(3, errorMessages.categoryNameMinLength),
  description: zod.string().min(1, errorMessages.require).min(5, errorMessages.categoryDescriptionMinLength),
  categoryImg: imageSchema.refine((value) => value && value.length > 0, {
    message: 'Category image is required'
  })
});

export type AddNewCategoryFormType = zod.infer<typeof AddNewCategoryFormSchema>;
export type AddNewCategoryFormCustom = Omit<AddNewCategoryFormType, 'categoryImg'> & {
  categoryImg: File;
  parent?: string;
};

export type EditCategoryFormType = Omit<AddNewCategoryFormType, 'categoryImg'> & {
  categoryImg?: File;
  category_id: string;
};
