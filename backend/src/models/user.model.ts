import { Document, model, Schema } from 'mongoose';

export enum Gender {
  male = 'Male',
  female = 'Female',
  other = 'Other'
}

export enum Role {
  admin = 'Admin',
  user = 'User'
}

export interface AvatarType {
  avatar_public_id: string;
  avatar_url: string;
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  fullName: string;
  phone: string;
  passport: string;
  gender?: Gender;
  role: Role;
  avatar: AvatarType;
}

const avatarSchema = new Schema<AvatarType>(
  {
    avatar_url: { type: String, required: true },
    avatar_public_id: { type: String, required: true }
  },
  { _id: false }
);

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, lowerCase: true, unique: true },
    password: {
      type: String,
      required: true
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    fullName: {
      type: String
    },
    phone: {
      type: String
    },
    passport: {
      type: String
    },
    gender: {
      type: String,
      enum: Object.values(Gender),
      default: Gender.male
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.user,
      required: true
    },
    avatar: { type: avatarSchema }
  },
  { timestamps: true }
);

const UserModel = model<IUser>('User', userSchema);

export default UserModel;
