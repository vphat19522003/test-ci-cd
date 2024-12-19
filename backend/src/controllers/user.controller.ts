import { Request, Response } from 'express';

import STATUS_CODE from '@app/constants/responseStatus';
import { IRequestCustom } from '@app/middleware/accessToken.middleware';
import UserService from '@app/services/user.service';

export const getUserController = async (req: IRequestCustom, res: Response): Promise<Response> => {
  const result = await UserService.getUser(req);

  return res.json({
    message: 'Get user successfully',
    result,
    status: STATUS_CODE.OK
  });
};

export const updateUserController = async (req: IRequestCustom, res: Response): Promise<Response> => {
  const result = await UserService.updateUser(req);

  return res.json({
    message: 'Update user successfully',
    result,
    status: STATUS_CODE.OK
  });
};

export const changePasswordController = async (req: IRequestCustom, res: Response): Promise<Response> => {
  await UserService.changePassword(req);

  return res.json({
    message: 'Change password successfully',
    status: STATUS_CODE.OK
  });
};

export const getListAddressController = async (req: IRequestCustom, res: Response): Promise<Response> => {
  const result = await UserService.getListAddress(req);

  return res.json({
    message: 'Get list address successfully',
    status: STATUS_CODE.OK,
    result
  });
};

export const addAddressController = async (req: IRequestCustom, res: Response): Promise<Response> => {
  const result = await UserService.addAddress(req);

  return res.json({
    message: 'Add address successfully',
    status: STATUS_CODE.OK,
    result
  });
};

export const deleteAddressController = async (req: Request, res: Response): Promise<Response> => {
  await UserService.deleteAddress(req);

  return res.json({
    message: 'Delete address successfully',
    status: STATUS_CODE.OK
  });
};

export const setDefaultAddressController = async (req: IRequestCustom, res: Response): Promise<Response> => {
  const result = await UserService.setDefaultAddress(req);

  return res.json({
    message: 'Set default address successfully',
    status: STATUS_CODE.OK,
    result
  });
};

export const uploadAvatarController = async (req: IRequestCustom, res: Response): Promise<Response> => {
  const result = await UserService.uploadAvatar(req);

  return res.json({
    message: 'Upload avatar successfully',
    status: STATUS_CODE.OK,
    result
  });
};
