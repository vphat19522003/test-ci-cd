import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ShoppingCart } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';

import { useAddToCart } from '@app/api/hooks/cart.hook';
import ButtonForm from '@app/components/atoms/button';
import QuantityGroupButton from '@app/components/organisms/quantityGroupButton';
import { useDevice } from '@app/hooks/useDevice';
import { setCart } from '@app/redux/cartSlice';
import { IErrorResponse } from '@app/types/common';

const ProductAction = ({ productId }: { productId: string }): JSX.Element => {
  const [productQuantity, setProductQuantity] = useState(1);
  const { isMobile } = useDevice();

  const { mutate: addToCart } = useAddToCart();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log({ productId });
  }, [productId]);

  const handleAddToCart = () => {
    console.log({ productId });

    if (productQuantity === 0) {
      toast.warning('Product quantity must be greater than 0');
      return;
    }

    const toastID = toast.loading('Please wait...');

    addToCart(
      { productId, quantity: productQuantity },
      {
        onSuccess: (data) => {
          dispatch(setCart({ cart: data.result.cartInfo, totalQuantity: data.result.totalQuantity }));
          toast.update(toastID, {
            render: 'Add product to cart successfully',
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

  const handleBuyNow = () => {
    if (productQuantity === 0) {
      toast.warning('Product quantity must be greater than 0');
      return;
    }

    if (!productId) {
      console.log({ productId });
    }
    const toastID = toast.loading('Please wait...');
    addToCart(
      { productId, quantity: productQuantity },
      {
        onSuccess: (data) => {
          dispatch(setCart({ cart: data.result.cartInfo, totalQuantity: data.result.totalQuantity }));
          toast.update(toastID, {
            render: 'Add product to cart successfully',
            type: 'success',
            isLoading: false,
            autoClose: 3000,
            closeButton: true
          });
          navigate('/cart');
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
    if (productQuantity <= 1) return;
    setProductQuantity((prev) => prev - 1);
  };
  const handleIncreaseQuantity = () => {
    setProductQuantity((prev) => prev + 1);
  };

  const handleChangeCartQuantity = (value: string) => {
    if (!value) setProductQuantity(0);

    const parseValue = Number(value.split(',').join(''));

    if (parseValue <= 0) return;

    setProductQuantity(parseValue);
  };

  return (
    <Stack direction={'column'} className={`p-4 ${!isMobile && 'w-full'}`} spacing={4}>
      {/* Quantity */}
      <Stack spacing={2}>
        <Typography className='font-extrabold'>Quantity</Typography>
        {/* Quantity action */}
        <QuantityGroupButton
          quantity={productQuantity}
          onIncreaseQuantity={handleIncreaseQuantity}
          onDecreaseQuantity={handleDecreaseQuantity}
          onChangeQuantity={handleChangeCartQuantity}
        />
      </Stack>
      {/* Price */}
      <Stack spacing={2}>
        <Typography className='font-extrabold text-xl'>Total</Typography>
        <Typography className='text-3xl font-semibold'>$100.000</Typography>
      </Stack>
      {/* Group Action Button */}
      <Stack spacing={2}>
        <ButtonForm variant='outlined' className='bg-pink-500 text-white border-none' onClick={handleBuyNow}>
          <Typography>Buy Now</Typography>
        </ButtonForm>
        <ButtonForm variant='outlined' onClick={handleAddToCart}>
          <Stack direction={'row'} spacing={2} alignItems={'center'}>
            <Typography className='text-sm'>Add To Cart</Typography>
            <ShoppingCart />
          </Stack>
        </ButtonForm>
      </Stack>
    </Stack>
  );
};

export default ProductAction;
