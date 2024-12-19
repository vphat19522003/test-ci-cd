import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query';

import { CartResultResponseType } from '@app/types/auth';
import { ICart } from '@app/types/cart';
import { IErrorResponse } from '@app/types/common';

import { addToCart, getCart, removeAllProductCart, removeProductCart, updateCartQuantity } from '../cart';

export const useAddToCart = (): UseMutationResult<
  CartResultResponseType,
  IErrorResponse,
  { productId: string; quantity: number }
> => {
  return useMutation({
    mutationFn: addToCart
  });
};

export const useUpdateCartQuantity = (): UseMutationResult<
  CartResultResponseType,
  IErrorResponse,
  {
    productId: string;
    quantity: number;
  }
> => {
  return useMutation({
    mutationFn: updateCartQuantity
  });
};

export const useRemoveProductCart = (): UseMutationResult<
  CartResultResponseType,
  IErrorResponse,
  {
    productId: string;
  }
> => {
  return useMutation({
    mutationFn: removeProductCart
  });
};

export const useRemoveAllProductCart = (): UseMutationResult<CartResultResponseType, IErrorResponse, null> => {
  return useMutation({
    mutationFn: removeAllProductCart
  });
};

export const useGetCart = (enabled: boolean): UseQueryResult<{ cartInfo: ICart; totalQuantity: number }> => {
  return useQuery({
    queryKey: ['get-cart'],
    queryFn: getCart,
    enabled
  });
};
