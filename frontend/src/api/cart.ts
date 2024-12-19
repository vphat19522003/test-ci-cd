import axiosCustom from '@app/config/axios';
import { CartResultResponseType } from '@app/types/auth';
import { ICart } from '@app/types/cart';

export const addToCart = async ({
  productId,
  quantity
}: {
  productId: string;
  quantity: number;
}): Promise<CartResultResponseType> => {
  const res = await axiosCustom.post('/cart/add-cart', {
    productId,
    quantity
  });

  return res.data;
};

export const updateCartQuantity = async ({
  productId,
  quantity
}: {
  productId: string;
  quantity: number;
}): Promise<CartResultResponseType> => {
  const res = await axiosCustom.post('/cart/update-cart-quantity', {
    productId,
    quantity
  });

  return res.data;
};

export const removeProductCart = async ({ productId }: { productId: string }): Promise<CartResultResponseType> => {
  const res = await axiosCustom.post('/cart/remove-product-cart', {
    productId
  });

  return res.data;
};

export const removeAllProductCart = async (): Promise<CartResultResponseType> => {
  const res = await axiosCustom.post('/cart/remove-all');

  return res.data;
};

export const getCart = async (): Promise<{ cartInfo: ICart; totalQuantity: number }> => {
  const res = await axiosCustom.get('/cart/get-my-cart');

  return res.data.result;
};
