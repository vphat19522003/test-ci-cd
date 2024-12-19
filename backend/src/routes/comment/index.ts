import { Router } from 'express';

import {
  addCommentController,
  deleteMyCommentController,
  getCommentsController,
  getImageCommentsController,
  getMyCommentController,
  getRatingSummaryController
} from '@app/controllers/comment.controller';
import verifyAccessToken from '@app/middleware/accessToken.middleware';
import validateRequest from '@app/middleware/validateRequest.middleware';
import verifyAccountHandler from '@app/middleware/verifyAccount.middleware';
import { upload } from '@app/utils/multerConfig';
import reqHandler from '@app/utils/reqHandler';
import commentValidators from '@app/validation/comment.validate';

const commentRouter = Router();

commentRouter.post(
  '/add-comment',
  verifyAccessToken,
  verifyAccountHandler,
  upload.fields([{ name: 'commentImg', maxCount: 3 }]),
  validateRequest(commentValidators.createComment),
  reqHandler(addCommentController)
);

commentRouter.post('/get-comments', reqHandler(getCommentsController));
commentRouter.post('/get-image-comments', reqHandler(getImageCommentsController));
commentRouter.post('/get-my-comment', verifyAccessToken, verifyAccountHandler, reqHandler(getMyCommentController));
commentRouter.post(
  '/delete-my-comment',
  verifyAccessToken,
  verifyAccountHandler,
  reqHandler(deleteMyCommentController)
);

commentRouter.post('/get-rating-summary', reqHandler(getRatingSummaryController));

export default commentRouter;
