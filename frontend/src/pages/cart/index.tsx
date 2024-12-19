import { useSelector } from 'react-redux';

import { Stack } from '@mui/material';

import BreadCrumb from '@app/components/organisms/breadcrumb';
import { useDevice } from '@app/hooks/useDevice';
import { RootState } from '@app/store';

import CartProductInformation from './components/CartProductInformation';
import CartProductList from './components/CartProductList';

const CartPage = (): JSX.Element => {
  const { isMobile } = useDevice();
  const cartItemList = useSelector((state: RootState) => state.cart.cart?.cartItems);
  const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

  return (
    <Stack>
      <BreadCrumb mainCategory={'cart'} subCategories={[]} />
      <Stack direction={isMobile ? 'column' : 'row'} spacing={4} className='mb-4'>
        {/* Cart Product List */}
        <Stack
          className={`${isMobile ? 'w-full' : 'w-8/12'} bg-white rounded-lg max-h-max `}
          style={{
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)'
          }}>
          <CartProductList cartItemList={cartItemList || []} totalQuantity={totalQuantity} />
        </Stack>
        {/* Cart Product Information */}
        <Stack
          className={`${isMobile ? '' : 'w-4/12'} bg-white rounded-lg max-h-max px-4 py-2`}
          style={{
            position: isMobile ? 'unset' : 'sticky',
            top: isMobile ? '0px' : '16px',
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)'
          }}>
          <CartProductInformation totalPrice={totalPrice} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CartPage;
