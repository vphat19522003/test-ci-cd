import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { AccountCircle, ShoppingCart } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';

import { paths } from '@app/routes/paths';
import { RootState } from '@app/store';

import HeaderBoxHover from '../headerBoxHover';

const HeaderAction = (): JSX.Element => {
  const user = useSelector((state: RootState) => state.auth.user);
  const cartQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Stack direction={'row'} spacing={4} alignItems={'center'}>
      <Box onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className='relative'>
        <Link
          to={user ? 'user/account' : '/login'}
          className='text-sm text-blue-700 no-underline transition-colors duration-300 hover:text-blue-600 cursor-pointer'>
          <Stack
            direction={'row'}
            spacing={2}
            alignItems={'center'}
            className='relative transition-colors duration-300 cursor-pointer hover:text-blue-500'>
            {user?.avatar ? (
              <img
                src={user.avatar.avatar_url}
                alt=''
                className='w-[36px] h-[36px] rounded-full border-solid border-gray-200 object-cover border-2 mr-2'
              />
            ) : (
              <AccountCircle fontSize='large' className='mr-2 text-blue-700' />
            )}

            {user ? user.username : 'Login'}
          </Stack>
        </Link>

        {user && (
          <Box
            className={`absolute h-auto top-full left-0 w-[160px] z-10 shadow-md transition-all duration-300 ease-in-out text-blue-700 text-md ${
              isHovering ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}>
            <Box className='bg-white w-full h-full rounded-md overflow-hidden'>
              <HeaderBoxHover />
            </Box>
          </Box>
        )}
      </Box>

      <Link
        className='text-sm text-pink-500 no-underline transition-colors duration-300 hover:text-pink-600 cursor-pointer'
        to={paths.cart}>
        <Stack
          direction={'row'}
          spacing={2}
          alignItems={'center'}
          className='transition-colors duration-300 cursor-pointer hover:text-pink-700'>
          <Box className='relative'>
            <ShoppingCart fontSize='large' className='mr-2 text-pink-500' />
            <Box className='absolute rounded-full w-5 h-5 bg-pink-500 -top-2 right-0 shadow-md'>
              <Typography className='text-white text-center mt-[1px] text-sm'>{cartQuantity}</Typography>
            </Box>
          </Box>
          Shopping Cart
        </Stack>
      </Link>
    </Stack>
  );
};

export default HeaderAction;
