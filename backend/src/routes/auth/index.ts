import { Router } from 'express';

import {
  loginController,
  logoutController,
  registerController,
  resendOTPController,
  verifyOTPController,
  verifyRefreshTokenController
} from '@app/controllers/auth.controller';
import verifyAccessToken from '@app/middleware/accessToken.middleware';
import reqHandler from '@app/utils/reqHandler';

const authRouter = Router();

authRouter.get('', (req, res) => {
  res.json('auth api');
});

authRouter.post('/register', reqHandler(registerController));
authRouter.post('/login', reqHandler(loginController));
authRouter.post('/logout', reqHandler(logoutController));
authRouter.post('/verify-otp', verifyAccessToken, reqHandler(verifyOTPController));
authRouter.post('/resend-otp', verifyAccessToken, reqHandler(resendOTPController));

authRouter.post('/refresh-token', reqHandler(verifyRefreshTokenController));

export default authRouter;
