import { Router } from 'express';

import { getDistrictController, getProvinceController, getWardController } from '@app/controllers/location.controller';
import reqHandler from '@app/utils/reqHandler';

const locationRouter = Router();

locationRouter.get('/get-province', reqHandler(getProvinceController));
locationRouter.post('/get-district', reqHandler(getDistrictController));
locationRouter.post('/get-ward', reqHandler(getWardController));

export default locationRouter;
