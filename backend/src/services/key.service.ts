import { omit } from 'lodash';
import mongoose, { Types } from 'mongoose';

import KeyModel from '@app/models/key.model';

interface IKey {
  userId: string | Types.ObjectId;
  public_key: string;
  private_key: string;
  refresh_token: string;
  used_refresh_tokens?: string[];
  access_token: string;
}

class KeyService {
  static async createUserKey({
    userId,
    public_key,
    private_key,
    access_token,
    refresh_token,
    used_refresh_tokens = []
  }: IKey): Promise<IKey> {
    const keyCreate = await KeyModel.create({
      userId,
      public_key,
      private_key,
      access_token,
      refresh_token,
      used_refresh_tokens
    });

    return omit(keyCreate.toObject(), ['_id']);
  }

  static async findKeyByUserId(userId: string): Promise<IKey> {
    const key = await KeyModel.findOne({ userId: new mongoose.Types.ObjectId(userId) });

    return key?.toObject() as IKey;
  }

  static async deleteKeyByUserId(userId: string): Promise<void> {
    await KeyModel.deleteOne({ userId: new mongoose.Types.ObjectId(userId) });
  }
}

export default KeyService;
