import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Delete, Inventory } from '@mui/icons-material';
import { Divider, IconButton, Stack, Typography } from '@mui/material';

import { useRemoveProductCart, useUpdateCartQuantity } from '@app/api/hooks/cart.hook';
import QuantityGroupButton from '@app/components/organisms/quantityGroupButton';
import { useDevice } from '@app/hooks/useDevice';
import { setCart } from '@app/redux/cartSlice';
import { ICartItem } from '@app/types/cart';
import { IErrorResponse } from '@app/types/common';

type CartProductItemProps = { cartItem: ICartItem };
const CartProductItem = ({ cartItem }: CartProductItemProps): JSX.Element => {
  const { isMobile } = useDevice();
  const { productId: productInfo, quantity } = cartItem;
  const { mutate: removeProductCart } = useRemoveProductCart();
  const { mutate: updateCartQuantity, isPending } = useUpdateCartQuantity();
  const dispatch = useDispatch();

  const handleRemoveProductCart = () => {
    const toastID = toast.loading('Please wait...');
    removeProductCart(
      { productId: productInfo._id },
      {
        onSuccess: (data) => {
          dispatch(setCart({ cart: data.result.cartInfo, totalQuantity: data.result.totalQuantity }));
          toast.update(toastID, {
            render: 'Remove successfully',
            type: 'success',
            isLoading: false,
            autoClose: 3000,
            closeButton: true
          });
        },
        onError: (err: IErrorResponse) => {
          toast.update(toastID, {
            render: err.response.data.message as string,
            type: 'error',
            isLoading: false,
            autoClose: 3000,
            closeButton: true
          });
        }
      }
    );
  };

  const handleDecreaseQuantity = () => {
    if (!productInfo._id) return;

    if (quantity <= 1) return;

    const toastID = toast.loading('Please wait...');
    updateCartQuantity(
      { productId: productInfo._id, quantity: -1 },
      {
        onSuccess: (data) => {
          dispatch(setCart({ cart: data.result.cartInfo, totalQuantity: data.result.totalQuantity }));
          toast.update(toastID, {
            render: 'Update quantity successfully',
            type: 'success',
            isLoading: false,
            autoClose: 3000,
            closeButton: true
          });
        },
        onError: (err: IErrorResponse) => {
          toast.update(toastID, {
            render: err.response.data.message as string,
            type: 'error',
            isLoading: false,
            autoClose: 3000,
            closeButton: true
          });
        }
      }
    );
  };
  const handleIncreaseQuantity = () => {
    if (!productInfo._id) return;

    const toastID = toast.loading('Please wait...');
    updateCartQuantity(
      { productId: productInfo._id, quantity: 1 },
      {
        onSuccess: (data) => {
          dispatch(setCart({ cart: data.result.cartInfo, totalQuantity: data.result.totalQuantity }));
          toast.update(toastID, {
            render: 'Update quantity successfully',
            type: 'success',
            isLoading: false,
            autoClose: 3000,
            closeButton: true
          });
        },
        onError: (err: IErrorResponse) => {
          toast.update(toastID, {
            render: err.response.data.message as string,
            type: 'error',
            isLoading: false,
            autoClose: 3000,
            closeButton: true
          });
        }
      }
    );
  };

  const handleChangeCartQuantity = (value: string) => {
    const parseValue = Number(value.split(',').join(''));

    if (quantity === parseValue) return;

    const calcValue = quantity > parseValue ? -(quantity - parseValue) : parseValue - quantity;

    if (parseValue <= 0) return;

    const toastID = toast.loading('Please wait...');
    updateCartQuantity(
      { productId: productInfo._id, quantity: calcValue },
      {
        onSuccess: (data) => {
          dispatch(setCart({ cart: data.result.cartInfo, totalQuantity: data.result.totalQuantity }));
          toast.update(toastID, {
            render: 'Update quantity successfully',
            type: 'success',
            isLoading: false,
            autoClose: 3000,
            closeButton: true
          });
        },
        onError: (err: IErrorResponse) => {
          toast.update(toastID, {
            render: err.response.data.message as string,
            type: 'error',
            isLoading: false,
            autoClose: 3000,
            closeButton: true
          });
        }
      }
    );
  };

  return (
    <Stack
      direction={isMobile ? 'column' : 'row'}
      className='rounded-lg border-[0.5px] border-solid border-slate-300 p-5'
      spacing={4}>
      {/* Cart Product Image */}
      <Stack className={`${isMobile ? 'w-full' : 'w-4/12'} rounded-lg overflow-hidden max-h-[200px]`}>
        <img
          src={productInfo?.productThumbImg?.url}
          alt='Product Image'
          className='w-full h-full object-contain rounded-lg'
        />
      </Stack>
      {/* Cart Product INFO + ACTION */}
      <Stack className={`${isMobile ? 'w-full' : 'w-8/12'} mt-4`} spacing={2}>
        {/* INFO */}
        <Stack direction={isMobile ? 'column' : 'row'} justifyContent={'space-between'}>
          <Stack>
            <Link to={'/'} className='no-underline text-black'>
              <Typography className='font-bold'>{productInfo?.productName}</Typography>
            </Link>
            <Typography className='text-md'>Giải trí</Typography>
          </Stack>

          <Stack spacing={4}>
            <Stack direction='row' alignItems={'center'} spacing={2} className={`${isMobile && 'mt-4'}`}>
              <Typography className='text-xl font-bold'>{productInfo?.productPrice}</Typography>
              <Typography className='text-sm line-through text-slate-400 font-semibold'>260.000đ</Typography>
            </Stack>
            <QuantityGroupButton
              quantity={quantity}
              onChangeQuantity={handleChangeCartQuantity}
              onDecreaseQuantity={handleDecreaseQuantity}
              onIncreaseQuantity={handleIncreaseQuantity}
              isPending={isPending}
            />
          </Stack>
        </Stack>

        <Divider className='my-3' />
        {/* ACTION */}
        <Stack direction={'row'} justifyContent={'space-between'} className='mt-0'>
          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <Inventory />
            <Typography className='text-red-500 text-md'>Tình trạng: </Typography>
            <Typography className='text-green-700 text-md'>Còn hàng</Typography>
          </Stack>
          <IconButton onClick={handleRemoveProductCart}>
            <Delete className='text-red-600' />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CartProductItem;
