import { Request } from 'express';
import { omit } from 'lodash';

import { district } from '@app/asset/location/district';
import { provinces } from '@app/asset/location/province';
import { ward } from '@app/asset/location/ward';
import STATUS_CODE from '@app/constants/responseStatus';
import { CustomError } from '@app/core/response.error';
import { ILocation } from '@app/type/addressType';

class LocationService {
  static async getProvince(): Promise<ILocation[]> {
    return provinces.map((province) => omit(province, '_id', 'slug', 'name_with_type', 'isDeleted', 'type'));
  }

  static async getDistrict(req: Request): Promise<ILocation[]> {
    const provinceCode = req.query.province_code;

    if (!provinceCode) throw new CustomError('Not provide province', STATUS_CODE.BAD_REQUEST);

    const listFilter = district.filter((item) => item['parent_code'] == provinceCode);

    return listFilter.map((district) =>
      omit(district, '_id', 'slug', 'name_with_type', 'isDeleted', 'path', 'path_with_type', 'parent_code', 'type')
    );
  }

  static async getWard(req: Request): Promise<ILocation[]> {
    const districtCode = req.query.district_code;

    if (!districtCode) throw new CustomError('Not provide district', STATUS_CODE.BAD_REQUEST);

    const listFilter = ward.filter((item) => item['parent_code'] == districtCode);

    return listFilter.map((ward) =>
      omit(ward, '_id', 'slug', 'name_with_type', 'isDeleted', 'path', 'path_with_type', 'parent_code', 'type')
    );
  }
}

export default LocationService;
