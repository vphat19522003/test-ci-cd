import { Divider, Stack, Typography } from '@mui/material';

import { ICartItem } from '@app/types/cart';

import CartProductItem from './CartProductItem';

type CartProductListType = {
  cartItemList: ICartItem[];
  totalQuantity: number;
};

const CartProductList = ({ cartItemList, totalQuantity }: CartProductListType): JSX.Element => {
  return (
    <>
      <Typography className='px-4 py-2 text-2xl font-bold'>Giỏ hàng</Typography>
      <Divider />
      <Stack className='px-4 py-2'>
        <Typography className='text-lg mb-4'>
          Bạn đang có <b>{totalQuantity} sản phẩm</b> trong giỏ hàng
        </Typography>
        <Stack spacing={4}>
          {cartItemList &&
            cartItemList.length > 0 &&
            cartItemList.map((cartItem, index) => <CartProductItem key={index} cartItem={cartItem} />)}
        </Stack>
      </Stack>
    </>
  );
};

export default CartProductList;
