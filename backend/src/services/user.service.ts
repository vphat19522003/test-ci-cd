import bcrypt from 'bcrypt';
import { Request } from 'express';
import { omit } from 'lodash';
import mongoose from 'mongoose';

import { district } from '@app/asset/location/district';
import { provinces } from '@app/asset/location/province';
import { ward } from '@app/asset/location/ward';
import STATUS_CODE from '@app/constants/responseStatus';
import { CustomError } from '@app/core/response.error';
import { IRequestCustom } from '@app/middleware/accessToken.middleware';
import { AddressInfo } from '@app/repository/address.repository';
import AddressRepository from '@app/repository/address.repository';
import UserRepository, { UserInfo } from '@app/repository/user.repository';
import cloudinary, { uploadToCloudinary } from '@app/utils/cloudinaryConfig';
import { isValidImage } from '@app/utils/validateFileType.util';

class UserService {
  static async getUser(req: IRequestCustom): Promise<Omit<UserInfo, 'password'>> {
    const user = req.user as UserInfo;
    return omit(user, 'password', '__v', 'updatedAt');
  }

  static async updateUser(req: IRequestCustom): Promise<Omit<UserInfo, 'password'>> {
    const { _id } = req.user as UserInfo;
    const { fullName, phone, passport, gender } = req.body as UserInfo;

    const updatedUser = await UserRepository.updateUserById({
      _id,
      fullName,
      phone,
      passport,
      gender
    });

    return omit(updatedUser, 'password', '__v', 'updatedAt');
  }

  static async changePassword(req: IRequestCustom): Promise<void> {
    const { _id, password } = req.user as UserInfo;
    const { current_password, password: new_password } = req.body;

    const comparePass = bcrypt.compareSync(current_password, password);
    if (!comparePass) throw new CustomError('Current password is not match', STATUS_CODE.BAD_REQUEST);

    const compareWithOldPass = bcrypt.compareSync(new_password, password);
    if (compareWithOldPass)
      throw new CustomError('Should not be similar to recently used passwords', STATUS_CODE.BAD_REQUEST);

    // Hash the password
    const saltRounds = await bcrypt.genSalt(10); // Number of salt rounds to use for hashing
    const hashedPassword = await bcrypt.hash(new_password, saltRounds);

    const newPasswordUser = await UserRepository.updateUserPassword({ _id, hashedPassword });
    if (!newPasswordUser) throw new CustomError("Can't change password", STATUS_CODE.INTERNAL_SERVER_ERROR);
  }

  static async getListAddress(req: IRequestCustom): Promise<AddressInfo[]> {
    const { _id: userId } = req.user as UserInfo;

    const addressList = await AddressRepository.getListAddressByUser(userId);

    return addressList.map((address) => omit(address, 'createdAt', 'updatedAt', '__v'));
  }

  static async addAddress(req: IRequestCustom): Promise<AddressInfo> {
    const { _id } = req.user as UserInfo;
    const { address_city, address_district, address_ward, address_street, address_type } = req.body;

    if (!address_city) throw new CustomError('Address city is required', STATUS_CODE.BAD_REQUEST);
    if (!address_district) throw new CustomError('Address district is required', STATUS_CODE.BAD_REQUEST);
    if (!address_ward) throw new CustomError('Address ward is required', STATUS_CODE.BAD_REQUEST);
    if (!address_type) throw new CustomError('Address type is required', STATUS_CODE.BAD_REQUEST);
    if (!address_street) throw new CustomError('Address street is required', STATUS_CODE.BAD_REQUEST);

    const city = provinces.find((province) => province.code === address_city);
    const districtItem = district.find((item) => item.code === address_district);
    const wardItem = ward.find((item) => item.code === address_ward);

    if (!city || !districtItem || !wardItem) throw new CustomError('Not found address data', STATUS_CODE.BAD_REQUEST);

    const address_detail = `${address_street} ${wardItem?.name} ${districtItem?.name} ${city?.name}`;

    console.log({ address_detail });

    const customAddress = {
      userId: _id,
      address_street,
      address_detail,
      address_type,
      address_city: {
        name: city.name,
        code: city.code
      },
      address_ward: {
        name: wardItem.name,
        code: wardItem.code
      },
      address_district: {
        name: districtItem.name,
        code: districtItem.code
      }
    };
    const newAddress = await AddressRepository.createAddress(customAddress);

    return omit(newAddress, 'createdAt', 'updatedAt', '__v');
  }

  static async deleteAddress(req: Request): Promise<void> {
    const addressId = req.query.address_id as string;

    const address = await AddressRepository.getAddress(addressId);

    if (!address) throw new CustomError('Failed to get address', STATUS_CODE.INTERNAL_SERVER_ERROR);

    const result = (await AddressRepository.deleteAddress(addressId)) as mongoose.mongo.DeleteResult;

    if (result.deletedCount !== 1) throw new CustomError('Failed to delete address', STATUS_CODE.INTERNAL_SERVER_ERROR);
  }

  static async setDefaultAddress(req: IRequestCustom): Promise<AddressInfo> {
    const { _id } = req.user as UserInfo;
    const addressId = req.query.address_id as string;

    const address = await AddressRepository.getAddress(addressId);

    if (address.isSetDefault) throw new CustomError('Address is already set default', STATUS_CODE.BAD_REQUEST);

    const defaultAddress = await AddressRepository.updateStatusAddress(_id, addressId);

    return defaultAddress;
  }

  static async uploadAvatar(req: IRequestCustom): Promise<Omit<UserInfo, 'password'>> {
    const user = req.user as UserInfo;
    const file = req.file;
    const folder = `user/${user.username}/avatar`;

    if (!file) throw new CustomError('No file provided', STATUS_CODE.BAD_REQUEST);

    if (!isValidImage(file)) throw new CustomError("File doesn't have valid type", STATUS_CODE.BAD_REQUEST);

    try {
      const uploadResult = await uploadToCloudinary(file, folder);
      const oldAvatarId = user.avatar?.avatar_public_id;

      if (oldAvatarId) await cloudinary.uploader.destroy(user.avatar?.avatar_public_id as string);

      const updateUser = await UserRepository.updateUserAvatar({
        _id: user._id,
        avatar: {
          avatar_url: uploadResult.url,
          avatar_public_id: uploadResult.public_id
        }
      });

      return omit(updateUser, 'password', '__v', 'updatedAt');
    } catch (error) {
      throw new CustomError('Failed to upload avatar', STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
  }
}

export default UserService;
