import { UploadApiResponse } from 'cloudinary';
import { Types } from 'mongoose';

import STATUS_CODE from '@app/constants/responseStatus';
import { CustomError } from '@app/core/response.error';
import { IRequestCustom } from '@app/middleware/accessToken.middleware';
import CommentModel from '@app/models/comment.model';
import ProductModel from '@app/models/product.model';
import CommentRepository, { CommentInfo } from '@app/repository/comment.repository';
import { UserInfo } from '@app/repository/user.repository';
import { deleteFromCloudinary, uploadToCloudinary } from '@app/utils/cloudinaryConfig';
import { isValidImage } from '@app/utils/validateFileType.util';

class CommentService {
  static async addComment(req: IRequestCustom): Promise<CommentInfo> {
    const { _id: userId } = req.user as UserInfo;
    const { productId, content, comment_vote } = req.body;
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };
    const uploadedImages: string[] = [];
    let commentImgUploadResults: UploadApiResponse[] = [];

    if (!Types.ObjectId.isValid(productId)) {
      throw new CustomError('Product ID is not valid', STATUS_CODE.BAD_REQUEST);
    }

    const product = await ProductModel.findById(new Types.ObjectId(productId));

    if (!product) throw new CustomError('Product not found', STATUS_CODE.BAD_REQUEST);

    const folder = `comment/${product._id + '-' + product.productName}/${userId}`;

    const commentImgs = files && files['commentImg'] ? files['commentImg'] : [];

    try {
      if (commentImgs.length >= 1 && commentImgs.length <= 3) {
        commentImgUploadResults =
          (await Promise.all(
            commentImgs.map(async (img) => {
              if (!isValidImage(img))
                throw new CustomError("Description image doesn't have valid type", STATUS_CODE.BAD_REQUEST);
              const uploadResult = await uploadToCloudinary(img, folder);
              uploadedImages.push(uploadResult.public_id);
              return uploadResult;
            })
          )) || [];
      }

      const commentData = {
        userId,
        productId,
        content,
        comment_vote,
        comment_images: commentImgUploadResults?.map((item) => ({
          url: item.url,
          public_id: item.public_id
        }))
      } as CommentInfo;

      const newComment = await CommentRepository.createComment(commentData);

      if (newComment) {
        const product = await ProductModel.findById(newComment.productId);

        if (product) {
          const totalComment = product.totalComment + 1;
          const newVoteRate = (product.productVoteRate * product.totalComment + newComment.comment_vote) / totalComment;

          await ProductModel.updateOne(
            { _id: product?._id },
            {
              productVoteRate: Math.ceil(newVoteRate),
              totalComment
            }
          );
        }
      }

      return newComment;
    } catch (err) {
      if (uploadedImages.length > 0) {
        await Promise.all(uploadedImages.map((public_id) => deleteFromCloudinary(public_id)));
      }

      throw new CustomError('Failed to upload images', STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
  }

  static async getComments(req: IRequestCustom): Promise<{
    data: CommentInfo[];
    pagination: {
      page: number;
      pageSize: number;
      total: number;
    };
  }> {
    const { productId, page = 1, pageSize = 5, filter } = req.body;

    if (!Types.ObjectId.isValid(productId)) {
      throw new CustomError('Product ID is not valid', STATUS_CODE.BAD_REQUEST);
    }

    const product = await ProductModel.findById(new Types.ObjectId(productId));

    if (!product) throw new CustomError('Product not found', STATUS_CODE.BAD_REQUEST);

    const filterQuery: Record<string, any> = { productId: product.id };

    if (filter) {
      if (filter.hasImage) {
        filterQuery['comment_images'] = { $exists: true, $ne: [] };
      }

      // if (filter.hasBought) {
      //   filterQuery['hasBought'] = true;
      // }

      if (filter.rating?.length > 0) {
        filterQuery['comment_vote'] = { $in: filter.rating };
      }
    }

    const skip = (Number(page) - 1) * Number(pageSize);
    const limit = Number(pageSize);
    const total = await CommentModel.countDocuments(filterQuery);

    const commentList = await CommentModel.find(filterQuery)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: filter?.latest === true ? -1 : 1 })
      .populate('userId', 'username createdAt avatar')
      .exec();

    return { data: commentList as unknown as CommentInfo[], pagination: { page, pageSize, total } };
  }

  static async getImageComments(req: IRequestCustom): Promise<string[]> {
    const { productId } = req.body;

    if (!Types.ObjectId.isValid(productId as string)) {
      throw new CustomError('Product ID is not valid', STATUS_CODE.BAD_REQUEST);
    }

    const product = await ProductModel.findById(new Types.ObjectId(productId as string));

    if (!product) throw new CustomError('Product not found', STATUS_CODE.BAD_REQUEST);

    const imageComments = await CommentModel.find({ productId }).select('comment_images').sort({ createdAt: -1 });

    const commentImagesUrls = imageComments.flatMap((comment) => comment.comment_images.map((image) => image.url));

    return commentImagesUrls;
  }

  static async getMyComment(req: IRequestCustom): Promise<CommentInfo | null> {
    const { _id: userId } = req.user as UserInfo;
    const { productId } = req.body;

    if (!Types.ObjectId.isValid(productId)) {
      throw new CustomError('Product ID is not valid', STATUS_CODE.BAD_REQUEST);
    }

    const product = await ProductModel.findById(new Types.ObjectId(productId));

    if (!product) throw new CustomError('Product not found', STATUS_CODE.BAD_REQUEST);

    const myComment = await CommentModel.find({
      productId,
      userId
    }).populate('userId', 'username createdAt avatar');

    if (!myComment || myComment.length === 0) return null;

    return myComment[0].toObject<CommentInfo>();
  }

  static async deleteMyComment(req: IRequestCustom): Promise<void> {
    const { _id: userId } = req.user as UserInfo;
    const { productId } = req.body;

    if (!Types.ObjectId.isValid(productId)) {
      throw new CustomError('Product ID is not valid', STATUS_CODE.BAD_REQUEST);
    }

    const product = await ProductModel.findById(new Types.ObjectId(productId));

    if (!product) throw new CustomError('Product not found', STATUS_CODE.BAD_REQUEST);

    const comment = await CommentModel.findOne({ userId, productId });
    if (!comment) throw new CustomError('Comment not found', STATUS_CODE.BAD_REQUEST);

    const deleteResult = await CommentModel.deleteOne({ userId, productId });

    if (deleteResult.deletedCount === 0) throw new CustomError('Comment not found', STATUS_CODE.BAD_REQUEST);

    const totalComment = product.totalComment - 1;

    let newVoteRate = 0;
    if (totalComment > 0) {
      newVoteRate = (product.productVoteRate * product.totalComment - comment.comment_vote) / totalComment;
    }

    await ProductModel.updateOne(
      { _id: product?._id },
      {
        productVoteRate: Math.ceil(newVoteRate),
        totalComment
      }
    );
  }

  static async getRatingSummary(req: IRequestCustom): Promise<{ star: number; count: number }[]> {
    const { productId } = req.body;

    if (!Types.ObjectId.isValid(productId)) {
      throw new CustomError('Product ID is not valid', STATUS_CODE.BAD_REQUEST);
    }

    const product = await ProductModel.findById(new Types.ObjectId(productId));
    if (!product) throw new CustomError('Product not found', STATUS_CODE.BAD_REQUEST);

    const ratingSummary = await CommentModel.aggregate([
      { $match: { productId: new Types.ObjectId(productId) } },
      {
        $group: {
          _id: '$comment_vote',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          star: '$_id',
          count: 1,
          _id: 0
        }
      },
      { $sort: { star: -1 } }
    ]);

    return ratingSummary;
  }
}

export default CommentService;
