import { useDispatch, useSelector } from 'react-redux';

import { Close, Favorite } from '@mui/icons-material';
import { Divider, IconButton, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';

import { useDevice } from '@app/hooks/useDevice';
import { closeProductSidebar } from '@app/redux/uiSlice';
import { RootState } from '@app/store';

const ProductDetailSideBar = (): JSX.Element => {
  const isOpen = useSelector((state: RootState) => state.ui.showProductDetailSidebar);
  const dispatch = useDispatch();
  const productDetailData = useSelector((state: RootState) => state.ui.productDetailData);
  const { isMobile } = useDevice();

  // useEffect(() => {
  //   if (isOpen) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = 'auto';
  //   }

  //   return () => {
  //     document.body.style.overflow = 'auto';
  //   };
  // }, [isOpen]);

  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className='fixed inset-0 z-10 bg-black'
          onClick={() => dispatch(closeProductSidebar())}
        />
      )}

      <motion.div
        initial={{ x: '100%' }} // Bắt đầu ở ngoài màn hình bên trái
        animate={{ x: isOpen ? '0%' : '100%' }} // Nếu mở, chuyển vào màn hình, nếu đóng, di chuyển ra ngoài
        transition={{ type: 'tween', duration: 0.5 }} // Thiết lập hiệu ứng chuyển động
        className={`fixed right-0 z-20 bg-white ${window.scrollY > 400 && !isMobile ? 'top-[89px]' : 'top-0'} ${isMobile ? 'top-20 bottom-11' : 'bottom-0'} w-[280px] max-h-screen overflow-y-scroll shadow-md py-2 rounded-tl-xl rounded-bl-xl px-4`}>
        <Stack direction={'row'} justifyContent={'space-between'} className='py-2'>
          <Typography variant='h5' className='py-2 text-xl font-bold text-blue-700 '>
            Product Details
          </Typography>
          <IconButton onClick={() => dispatch(closeProductSidebar())}>
            <Close />
          </IconButton>
        </Stack>

        <Stack direction={'column'} spacing={2}>
          <div className='relative w-full overflow-hidden rounded-lg max-h-fit'>
            <img src={productDetailData?.productThumbImg.url} alt='shoes' className='object-cover w-full h-full ' />
            <IconButton className='absolute top-1 right-1'>
              <Favorite className='text-red-500' />
            </IconButton>
          </div>
          <Typography className='font-bold'>{productDetailData?.productName}</Typography>
          <Typography className='text-justify text-md'>{productDetailData?.description}</Typography>
          <Stack direction={'column'} className='mt-2'>
            <Stack direction={'row'} justifyContent={'space-between'} className='py-3'>
              <Typography className='text-md'>Price</Typography>
              <Stack direction='row' alignItems={'center'} spacing={1}>
                <Typography className='text-2xl font-semibold'>${productDetailData?.productPrice}</Typography>
                <Typography className='text-sm line-through'>$399.00</Typography>
              </Stack>
            </Stack>
            <Divider />
            <Stack direction={'row'} justifyContent={'space-between'} className='py-3'>
              <Typography className='text-md'>Category</Typography>
              <Typography className='text-md'>Book</Typography>
            </Stack>
            <Divider />
            <Stack direction={'row'} justifyContent={'space-between'} className='py-3'>
              <Typography className='text-md'>Status</Typography>
              <Typography className='p-1 text-white bg-green-500 rounded-lg text-md'>Available</Typography>
            </Stack>
            <Divider />
            <Stack direction={'row'} justifyContent={'space-between'} className='py-3'>
              <Typography className='text-md'>Brands</Typography>
              <Typography className='text-md'>Unknown</Typography>
            </Stack>
          </Stack>
        </Stack>
      </motion.div>
    </>
  );
};

export default ProductDetailSideBar;
