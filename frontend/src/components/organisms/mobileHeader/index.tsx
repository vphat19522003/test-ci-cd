import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Menu, ShoppingCart } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';

import HeaderSearch from '@app/components/molecules/headerSearch';
import { toggleSidebar } from '@app/redux/uiSlice';
import { paths } from '@app/routes/paths';
import { RootState } from '@app/store';

const MobileHeader = (): JSX.Element => {
  const cartQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  return (
    <Box className='fixed top-0 left-0 z-50 w-full py-2 bg-white shadow-md'>
      <Stack className='w-full ' direction={'row'} alignItems={'center'} spacing={2}>
        <Stack className='basis-[18%]'>
          <button
            className='text-black bg-transparent bg-gray-100 border-none rounded-md hover:text-blue-700'
            onClick={() => dispatch(toggleSidebar())}>
            <Stack alignItems={'center'}>
              <Menu />
            </Stack>
          </button>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} spacing={2} className='w-full'>
          <Box className='basis-[85%] mt-2'>
            <HeaderSearch />
          </Box>
          <Link
            className='text-sm text-pink-500 no-underline transition-colors duration-300 hover:text-pink-600 cursor-pointer basis-[15%]'
            to={paths.cart}>
            <Stack justifyContent={'center'} direction={'row'}>
              <Box className='relative '>
                <ShoppingCart fontSize='medium' className=' text-pink-500' />
                <Box className='absolute rounded-full w-5 h-5 bg-pink-500 -top-3 -right-2 shadow-md'>
                  <Typography className='text-white text-center mt-[1px] text-sm'>{cartQuantity}</Typography>
                </Box>
              </Box>
            </Stack>
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
};

export default MobileHeader;
