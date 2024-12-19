import { Divider, Stack, Typography } from '@mui/material';

import MoMo from '@app/assets/momo.svg';
import ViteShop from '@app/assets/vite.svg';
import ButtonForm from '@app/components/atoms/button';

type CartProductInformationProps = {
  totalPrice: number;
};
const CartProductInformation = ({ totalPrice }: CartProductInformationProps): JSX.Element => {
  return (
    <Stack className='pb-4'>
      <Typography className='text-2xl font-bold'>Thanh toán</Typography>
      <Stack direction={'row'} justifyContent={'space-between'} className='my-4' alignItems={'end'}>
        <Typography className='font-semibold'>Tổng tiền: </Typography>
        <Typography className='text-red-500 text-2xl font-bold'>{totalPrice}₫</Typography>
      </Stack>
      <Divider />
      <ul className='px-6 text-md text-slate-400'>
        <li>Phí vận chuyển sẽ được tính ở trang thanh toán.</li>
        <li>Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.</li>
        <li>Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.</li>
      </ul>
      <ButtonForm variant='contained'>
        <Stack direction={'row'} alignItems={'center'} spacing={2} className='py-[2px]'>
          <img src={ViteShop} alt='viteshop' className='w-6 h-6 object-contain' />
          <Typography>Đăng nhập để thanh toán</Typography>
        </Stack>
      </ButtonForm>
      <Typography className='text-md text-slate-400 text-center py-3'>Quét mã. Thanh toán. Ngay lập tức</Typography>
      <ButtonForm variant='contained' className='bg-[#ae2070]'>
        <Stack direction={'row'} alignItems={'center'} spacing={2} className='py-[2px]'>
          <img src={MoMo} alt='viteshop' className='w-6 h-6 object-contain' />
          <Typography>Mua siêu tốc với MoMo</Typography>
        </Stack>
      </ButtonForm>
    </Stack>
  );
};

export default CartProductInformation;
