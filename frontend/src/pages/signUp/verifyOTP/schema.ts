import * as zod from 'zod';

import { errorMessages } from '@app/constants/errorMessages';
import { otpRegex } from '@app/constants/regex';

export type VerifyOTPInfoSchemaType = {
  code: string;
  email: string;
};

export type ResendOtpInfoSchemaType = {
  email: string;
};

export type VerifyOTPSchemaType = {
  handleSubmitOTP: (verify_information: VerifyOTPInfoSchemaType) => void;
  userEmail: string;
  handleResendOTP: (resetTimer: () => void) => void;
};

export const VerifyOTPValidateSchema = zod.object({
  code: zod.string().trim().regex(otpRegex, errorMessages.otpInvalid),
  email: zod.string().email(errorMessages.emailInvalid)
});

export type VerifyOTPValidateType = zod.infer<typeof VerifyOTPValidateSchema>;
