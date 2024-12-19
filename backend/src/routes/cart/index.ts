import { Router } from 'express';

import {
  addToCartController,
  getMyCartController,
  removeAllProductCartController,
  removeProductCartController,
  updateCartQuantityController
} from '@app/controllers/cart.controller';
import verifyAccessToken from '@app/middleware/accessToken.middleware';
import verifyAccountHandler from '@app/middleware/verifyAccount.middleware';
import reqHandler from '@app/utils/reqHandler';

const cartRouter = Router();

cartRouter.post('/add-cart', verifyAccessToken, verifyAccountHandler, reqHandler(addToCartController));
cartRouter.post(
  '/update-cart-quantity',
  verifyAccessToken,
  verifyAccountHandler,
  reqHandler(updateCartQuantityController)
);
cartRouter.post(
  '/remove-product-cart',
  verifyAccessToken,
  verifyAccountHandler,
  reqHandler(removeProductCartController)
);
cartRouter.post('/remove-all', verifyAccessToken, verifyAccountHandler, reqHandler(removeAllProductCartController));
cartRouter.get('/get-my-cart', verifyAccessToken, verifyAccountHandler, reqHandler(getMyCartController));

export default cartRouter;
