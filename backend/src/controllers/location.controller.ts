import { Request, Response } from 'express';

import STATUS_CODE from '@app/constants/responseStatus';
import LocationService from '@app/services/location.service';

export const getProvinceController = async (req: Request, res: Response): Promise<Response> => {
  const result = await LocationService.getProvince();

  return res.json({
    message: 'Get province successfully',
    code: STATUS_CODE.OK,
    result
  });
};

export const getDistrictController = async (req: Request, res: Response): Promise<Response> => {
  const result = await LocationService.getDistrict(req);

  return res.json({
    message: 'Get district successfully',
    code: STATUS_CODE.OK,
    result
  });
};

export const getWardController = async (req: Request, res: Response): Promise<Response> => {
  const result = await LocationService.getWard(req);

  return res.json({
    message: 'Get Ward successfully',
    code: STATUS_CODE.OK,
    result
  });
};
