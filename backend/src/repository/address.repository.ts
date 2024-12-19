import mongoose, { Types } from 'mongoose';

import STATUS_CODE from '@app/constants/responseStatus';
import { CustomError } from '@app/core/response.error';
import AddressModel, { AddressItemType, addressType } from '@app/models/address.model';

export type AddressInfo = {
  _id?: string;
  userId: string;
  address_detail: string;
  address_street: string;
  address_city: AddressItemType;
  address_district: AddressItemType;
  address_ward: AddressItemType;
  address_type: addressType;
  isSetDefault?: boolean;
};

class AddressRepository {
  static async getListAddressByUser(userId: string): Promise<AddressInfo[]> {
    const addressList = await AddressModel.find({ userId: new mongoose.Types.ObjectId(userId) }).lean();

    return addressList as unknown as AddressInfo[];
  }

  static async getAddress(addressId: string): Promise<AddressInfo> {
    const userAddress = await AddressModel.findById(new mongoose.Types.ObjectId(addressId));
    if (!userAddress) throw new CustomError('Failed to get address', STATUS_CODE.INTERNAL_SERVER_ERROR);

    return userAddress.toObject<AddressInfo>();
  }

  static async createAddress({
    userId,
    address_city,
    address_district,
    address_ward,
    address_street,
    address_type,
    address_detail
  }: AddressInfo): Promise<AddressInfo> {
    try {
      const newAddress = await AddressModel.create({
        userId: new Types.ObjectId(userId),
        address_city,
        address_district,
        address_ward,
        address_street,
        address_type,
        address_detail
      });
      return newAddress.toObject<AddressInfo>();
    } catch (err) {
      throw new CustomError('Failed to create address', STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
  }

  static async deleteAddress(addressId: string): Promise<mongoose.mongo.DeleteResult> {
    const result = await AddressModel.deleteOne({ _id: new Types.ObjectId(addressId) });

    return result;
  }

  static async updateStatusAddress(userId: string, addressId: string): Promise<AddressInfo> {
    await AddressModel.updateMany({ userId: new Types.ObjectId(userId) }, { isSetDefault: false });

    const updateAddress = await AddressModel.findByIdAndUpdate(
      { _id: new Types.ObjectId(addressId) },
      {
        isSetDefault: true
      },
      {
        new: true
      }
    );
    if (!updateAddress) throw new CustomError('Failed to set default address', STATUS_CODE.INTERNAL_SERVER_ERROR);

    return updateAddress?.toObject<AddressInfo>();
  }
}

export default AddressRepository;
