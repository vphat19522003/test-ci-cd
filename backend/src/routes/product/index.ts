import { Router } from 'express';

import {
  createProductController,
  getAllLatestProductController,
  getProductByFilterController,
  getProductDetailController
} from '@app/controllers/product.controller';
import verifyAccessToken from '@app/middleware/accessToken.middleware';
import validateRequest from '@app/middleware/validateRequest.middleware';
import verifyCategory from '@app/middleware/verifyCategory.middleware';
import { upload } from '@app/utils/multerConfig';
import reqHandler from '@app/utils/reqHandler';
import productValidators from '@app/validation/product.validate';

const productRouter = Router();

productRouter.post(
  '/test-uploadimage',
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'gallery', maxCount: 8 }
  ]),
  (req, res) => {
    const files = Object.assign({}, req.files);

    console.log(files);
  }
);

productRouter.post(
  '/create-product',
  verifyAccessToken,
  upload.fields([
    { name: 'thumbImg', maxCount: 1 },
    { name: 'descImg', maxCount: 8 }
  ]),
  verifyCategory,
  validateRequest(productValidators.createProduct),
  reqHandler(createProductController)
);

productRouter.get('/get-all-latest-products', reqHandler(getAllLatestProductController));
productRouter.get('/get-product-detail', reqHandler(getProductDetailController));
productRouter.post('/get-product-by-filter', reqHandler(getProductByFilterController));

export default productRouter;
