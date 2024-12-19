import mongoose, { Document, model, Schema } from 'mongoose';

interface IOTP extends Document {
  userId: mongoose.Types.ObjectId;
  code: string;
  expiresAt: Date;
  isUsed: boolean;
  email: string;
}

const otpSchema = new Schema<IOTP>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // ref to model user
      required: true
    },
    email: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true
    },
    expiresAt: {
      type: Date,
      required: true
    },
    isUsed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const OTPModel = model('OTP', otpSchema);

export default OTPModel;
