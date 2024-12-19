import * as zod from 'zod';

import { errorMessages } from '@app/constants/errorMessages';
import { otpRegex } from '@app/constants/regex';

export type AccountVerifyInfoSchemaType = {
  code: string;
  email: string;
};

export type ResendOtpInfoSchemaType = {
  email: string;
};

export type AccountVerifySchemaType = {
  handleSubmitOTP: (verify_information: AccountVerifyInfoSchemaType) => void;
  userEmail: string;
  handleResendOTP: (resetTimer: () => void) => void;
};

export const AccountVerifySchema = zod.object({
  code: zod.string().trim().regex(otpRegex, errorMessages.otpInvalid),
  email: zod.string().email(errorMessages.emailInvalid)
});

export type AccountVerifyValidateType = zod.infer<typeof AccountVerifySchema>;
