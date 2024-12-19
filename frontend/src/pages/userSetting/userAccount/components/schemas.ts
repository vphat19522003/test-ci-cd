import * as zod from 'zod';

import { errorMessages } from '@app/constants/errorMessages';
import { phoneNumberRegex } from '@app/constants/regex';

export const PersonalInfoSchema = zod.object({
  fullName: zod
    .string()
    .min(1, { message: errorMessages.require })
    .min(5, { message: errorMessages.fullNameMinLength }),
  phone: zod
    .string()
    .min(1, { message: errorMessages.require })
    .refine((value) => phoneNumberRegex.test(value), {
      message: errorMessages.phoneNumberInvalid
    }),
  passport: zod.string().min(1, { message: errorMessages.require }),
  gender: zod.string().min(1, { message: errorMessages.require })
});

export type PersonalInfoType = zod.infer<typeof PersonalInfoSchema>;
