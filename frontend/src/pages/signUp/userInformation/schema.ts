import * as zod from 'zod';

import { errorMessages } from '@app/constants/errorMessages';
import { passwordCriteria, passwordMinLength, userNameRegex } from '@app/constants/regex';

export const UserInfoValidSchema = zod
  .object({
    username: zod
      .string()
      .min(1, { message: errorMessages.require })
      .max(16, { message: errorMessages.usernameTooLong })
      .regex(userNameRegex, { message: errorMessages.usernameInvalid }),
    email: zod.string().min(1, { message: errorMessages.require }).email(errorMessages.emailInvalid),
    // fullName: zod.string().min(1, { message: errorMessages.require }),
    // phone: zod
    //   .string()
    //   .min(1, { message: errorMessages.require })
    //   .refine((value) => phoneNumberRegex.test(value), {
    //     message: errorMessages.phoneNumberInvalid
    //   }),
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

export type UserInfoValidType = zod.infer<typeof UserInfoValidSchema>;

export type UserInfoPropsType = {
  handleSubmitInformation: (userInfo: UserInfoValidType) => void;
};
