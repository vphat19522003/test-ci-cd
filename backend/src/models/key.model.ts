import mongoose, { model, Schema, Types } from 'mongoose';

interface IKEY extends Document {
  userId: Types.ObjectId;
  public_key: string;
  private_key: string;
  access_token: string;
  refresh_token: string;
  used_refresh_tokens: Types.Array<string>;
}

const keySchema = new Schema<IKEY>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // ref to model user
      required: true
    },
    public_key: {
      type: String,
      required: true
    },
    private_key: {
      type: String,
      required: true
    },
    access_token: {
      type: String,
      required: true
    },
    refresh_token: {
      type: String,
      required: true
    },
    used_refresh_tokens: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

const KeyModel = model('Key', keySchema);

export default KeyModel;
