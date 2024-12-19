import * as zod from 'zod';

import { errorMessages } from '@app/constants/errorMessages';
import { passwordCriteria, passwordMinLength } from '@app/constants/regex';

export const SecurityPasswordSchema = zod
  .object({
    current_password: zod.string().min(1, { message: errorMessages.require }),
    password: zod
      .string()
      .min(1, { message: errorMessages.require })
      .min(passwordMinLength, { message: errorMessages.passwordMinLength })
      .superRefine((value, ctx) => {
        passwordCriteria.forEach(({ regex, message }) => {
          if (!regex.test(value)) {
            ctx.addIssue({
              code: zod.ZodIssueCode.custom,
              message
            });
          }
        });
      }),
    confirmPassword: zod.string().min(1, { message: errorMessages.require })
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'], // Chỉ báo lỗi cho confirmPassword
    message: errorMessages.passwordNotMatch
  });

export type SecurityPasswordType = zod.infer<typeof SecurityPasswordSchema>;
