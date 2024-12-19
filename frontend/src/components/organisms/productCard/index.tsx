import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Favorite, StarBorder, Visibility } from '@mui/icons-material';
import { Card, CardContent, IconButton, Stack, Typography } from '@mui/material';

import { useAddToCart } from '@app/api/hooks/cart.hook';
import ButtonForm from '@app/components/atoms/button';
import { setCart } from '@app/redux/cartSlice';
import { toggleProductSidebar } from '@app/redux/uiSlice';
import { IErrorResponse } from '@app/types/common';

export type ProductCardType = {
  productId: string;
  productName: string;
  productPrice: number;
  productThumbImg: {
    url: string;
    public_id: string;
  };
  description: string;
};

const ProductCard = ({
  productName,
  productPrice,
  productThumbImg,
  description,
  productId
}: ProductCardType): JSX.Element => {
  const dispatch = useDispatch();
  const { mutate: addToCart } = useAddToCart();

  const handleAddToCart = () => {
    const toastID = toast.loading('Please wait...');
    addToCart(
      { productId, quantity: 1 },
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
  return (
    <Card className='!max-h-[380px] max-w-[260px] !p-2 border-[0.2px] border-solid border-slate-100 hover:shadow-lg'>
      <CardContent className='!p-0'>
        <Link to={`/product?productId=${productId}`}>
          <div className='relative w-full h-[260px] overflow-hidden bg-white rounded-lg '>
            <img title='shoes' src={productThumbImg.url} className='object-cover w-full h-full' />
            <IconButton className='absolute top-2 right-2'>
              <Favorite className='text-red-500' />
            </IconButton>
          </div>
        </Link>
        <Stack direction={'column'} spacing={2} className='p-1 h-[120px] cursor-default'>
          <Typography className={'truncate w-full mt-2'}>{productName}</Typography>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Stack direction='row' alignItems={'center'} spacing={1}>
              <Typography className='text-xl font-semibold'>${productPrice}</Typography>
              <Typography className='text-sm line-through'>$399.00</Typography>
            </Stack>
            <Stack direction={'row'} alignItems={'end'} spacing={1}>
              <StarBorder className='text-yellow-300 text-[22px]' />
              <Stack direction={'row'} alignItems={'end'} spacing={1}>
                <Typography className='text-base font-extrabold'>4.5</Typography>
                <Typography className='text-sm'>/5</Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack direction={'row'} className='w-full' spacing={4}>
            <ButtonForm
              className='bg-transparent rounded-lg flex-2'
              variant='contained'
              onClick={() =>
                dispatch(toggleProductSidebar({ productName, productPrice, productThumbImg, description }))
              }>
              <Visibility className='text-blue-700' />
            </ButtonForm>
            <ButtonForm className='flex-1 rounded-lg ' variant='contained' onClick={handleAddToCart}>
              Add to cart
            </ButtonForm>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
