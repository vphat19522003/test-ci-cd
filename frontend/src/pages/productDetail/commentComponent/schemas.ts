import * as zod from 'zod';

import { errorMessages } from '@app/constants/errorMessages';

export const addNewCommentFormSchemas = zod.object({
  content: zod.string().min(1, errorMessages.require).min(5, errorMessages.commentContentMinLength),
  comment_vote: zod.number().min(1, errorMessages.commentVoteMin).max(5, errorMessages.commentVoteMax),
  comment_images: zod.array(zod.instanceof(File)).optional()
});

export type AddNewCommentFormType = zod.infer<typeof addNewCommentFormSchemas>;

export type CommentFormTypeCustom = AddNewCommentFormType & {
  productId: string;
};

export type IComment = Omit<CommentFormTypeCustom, 'comment_images'> & {
  comment_date: string;
  userId: {
    _id: string;
    username: string;
    createdAt: string;
    avatar: {
      avatar_url: string;
      avatar_public_id: string;
    };
  };
  comment_images: {
    public_id: string;
    url: string;
  }[];
};
