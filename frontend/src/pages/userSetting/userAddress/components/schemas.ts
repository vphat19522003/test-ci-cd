import * as zod from 'zod';

import { errorMessages } from '@app/constants/errorMessages';

export const AddressFormSchema = zod.object({
  province: zod.string().trim().min(1, { message: errorMessages.require }),
  district: zod.string().trim().min(1, { message: errorMessages.require }),
  ward: zod.string().trim().min(1, { message: errorMessages.require }),
  street: zod
    .string()
    .trim()
    .min(1, { message: errorMessages.require })
    .min(5, { message: 'Street name must have at least 5 characters' }),
  type: zod.string().trim().min(1, { message: errorMessages.require })
});

export type AddressFormSchemaType = zod.infer<typeof AddressFormSchema>;
