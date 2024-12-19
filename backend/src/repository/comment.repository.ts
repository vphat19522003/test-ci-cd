import STATUS_CODE from '@app/constants/responseStatus';
import { CustomError } from '@app/core/response.error';
import CommentModel, { CommentImgType } from '@app/models/comment.model';

export interface CommentInfo {
  _id: string;
  userId: string;
  productId: string;
  content: string;
  comment_images: CommentImgType[];
  comment_date: Date;
  comment_vote: number;
}

class CommentRepository {
  static async createComment(comment: CommentInfo): Promise<CommentInfo> {
    const { userId, productId, content, comment_images, comment_vote } = comment;

    try {
      const newComment = await CommentModel.create({
        userId,
        productId,
        content,
        comment_images,
        comment_vote
      });

      return newComment.toObject<CommentInfo>();
    } catch (err) {
      throw new CustomError('Can not create comment', STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
  }
}

export default CommentRepository;
