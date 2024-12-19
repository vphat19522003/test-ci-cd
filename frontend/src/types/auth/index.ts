import { getProductTypeCustom } from '@app/pages/admin/ecommerce/addNewProductPage/components/schemas';
import { IComment } from '@app/pages/productDetail/commentComponent/schemas';

import { ICart } from '../cart';
import { UserTypeResponse } from '../user';

export type ResultResponseType = {
  message: string;
  status: number;
  result: UserTypeResponse;
};

export type ProductResultResponseType = Omit<ResultResponseType, 'result'> & {
  result: getProductTypeCustom[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
};

export type CommentResultResponseType = Omit<ResultResponseType, 'result'> & {
  result: {
    data: IComment[];
    pagination: {
      page: number;
      pageSize: number;
      total: number;
    };
  };
};

export type CartResultResponseType = Omit<ResultResponseType, 'result'> & {
  result: {
    cartInfo: ICart;
    totalQuantity: number;
  };
};
