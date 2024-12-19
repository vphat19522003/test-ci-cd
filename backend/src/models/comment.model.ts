import mongoose, { model, Schema } from 'mongoose';

export interface CommentImgType {
  public_id: string;
  url: string;
}

export interface IComment extends Document {
  userId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  content: string;
  comment_images: CommentImgType[];
  comment_date: Date;
  comment_vote: number;
}

const commentImgSchema = new Schema<CommentImgType>(
  {
    url: { type: String, required: true },
    public_id: { type: String, required: true }
  },
  { _id: false }
);

const commentSchemas = new Schema<IComment>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // ref to model user
      required: true
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    content: {
      type: String,
      required: true,
      minlength: 5
    },
    comment_images: { type: [commentImgSchema], default: [] },
    comment_date: { type: Date, required: true, default: Date.now },
    comment_vote: { type: Number, required: true, min: 1, max: 5 }
  },
  {
    timestamps: true
  }
);

const CommentModel = model<IComment>('Comment', commentSchemas);

export default CommentModel;
