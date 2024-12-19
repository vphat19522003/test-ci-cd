import * as zod from 'zod';

import { errorMessages } from '@app/constants/errorMessages';

export const LoginSchema = zod.object({
  username: zod.string().trim().min(1, { message: errorMessages.require }),
  password: zod.string().min(1, { message: errorMessages.require })
});

export type LoginSchemaType = zod.infer<typeof LoginSchema>;
