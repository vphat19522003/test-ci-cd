import { Router } from 'express';

import authRouter from './auth';
import cartRouter from './cart';
import categoryRouter from './category';
import commentRouter from './comment';
import locationRouter from './location';
import productRouter from './product';
import testRouter from './test';
import userRouter from './user';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/location', locationRouter);
router.use('/category', categoryRouter);
router.use('/product', productRouter);
router.use('/comment', commentRouter);
router.use('/cart', cartRouter);

//TEST
router.use('/test', testRouter);

export default router;
