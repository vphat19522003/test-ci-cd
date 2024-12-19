import { body } from 'express-validator';
import { Types } from 'mongoose';

const commentValidators = {
  createComment: [
    // Validate productId
    body('productId')
      .notEmpty()
      .withMessage('Product ID is required')
      .custom((value: string) => {
        if (!Types.ObjectId.isValid(value)) {
          throw new Error('Product ID is not valid');
        }
        return true;
      }),

    // Validate content
    body('content')
      .isString()
      .withMessage('Content must be a string')
      .isLength({ min: 5 })
      .withMessage('Content must have at least 5 characters'),

    // Validate comment_vote
    body('comment_vote').isInt({ min: 1, max: 5 }).withMessage('Comment vote must be between 1 and 5')
  ]
};

export default commentValidators;
