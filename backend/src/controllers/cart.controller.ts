import { Request, Response } from 'express';

import STATUS_CODE from '@app/constants/responseStatus';
import CartService from '@app/services/cart.service';

export const addToCartController = async (req: Request, res: Response): Promise<Response> => {
  const result = await CartService.addToCart(req);

  return res.json({
    status: STATUS_CODE.OK,
    message: 'Add to cart successfully',
    result
  });
};

export const updateCartQuantityController = async (req: Request, res: Response): Promise<Response> => {
  const result = await CartService.updateCartQuantity(req);

  return res.json({
    status: STATUS_CODE.OK,
    message: 'Quantity successfully updated',
    result
  });
};

export const removeProductCartController = async (req: Request, res: Response): Promise<Response> => {
  const result = await CartService.removeProductCart(req);

  return res.json({
    status: STATUS_CODE.OK,
    message: 'Remove item from cart successfully',
    result
  });
};

export const removeAllProductCartController = async (req: Request, res: Response): Promise<Response> => {
  await CartService.removeAllProductCart(req);

  return res.json({
    status: STATUS_CODE.OK,
    message: 'Delete cart successfully'
  });
};

export const getMyCartController = async (req: Request, res: Response): Promise<Response> => {
  const result = await CartService.getMyCart(req);

  return res.json({
    status: STATUS_CODE.OK,
    message: 'Get cart successfully',
    result
  });
};
