import { Router } from 'express';

import {
  addAddressController,
  changePasswordController,
  deleteAddressController,
  getListAddressController,
  getUserController,
  setDefaultAddressController,
  updateUserController,
  uploadAvatarController
} from '@app/controllers/user.controller';
import verifyAccessToken from '@app/middleware/accessToken.middleware';
import verifyAccountHandler from '@app/middleware/verifyAccount.middleware';
import { upload } from '@app/utils/multerConfig';
import reqHandler from '@app/utils/reqHandler';

const userRouter = Router();

userRouter.get('/get-user', verifyAccessToken, reqHandler(getUserController));
userRouter.post('/update-user', verifyAccessToken, verifyAccountHandler, reqHandler(updateUserController));
userRouter.post('/change-password', verifyAccessToken, verifyAccountHandler, reqHandler(changePasswordController));
userRouter.get('/get-list-address', verifyAccessToken, verifyAccountHandler, reqHandler(getListAddressController));
userRouter.post('/add-address', verifyAccessToken, verifyAccountHandler, reqHandler(addAddressController));
userRouter.post('/delete-address', verifyAccessToken, verifyAccountHandler, reqHandler(deleteAddressController));
userRouter.post(
  '/set-default-address',
  verifyAccessToken,
  verifyAccountHandler,
  reqHandler(setDefaultAddressController)
);
userRouter.post(
  '/upload-avatar',
  verifyAccessToken,
  verifyAccountHandler,
  upload.single('file'),
  reqHandler(uploadAvatarController)
);
export default userRouter;
