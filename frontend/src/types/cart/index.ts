import { getProductTypeCustom } from '@app/pages/admin/ecommerce/addNewProductPage/components/schemas';

export interface ICartItem {
  productId: getProductTypeCustom;
  quantity: number;
}
export interface ICart {
  _id: string;
  userId: string;
  cartItems: ICartItem[];
}
