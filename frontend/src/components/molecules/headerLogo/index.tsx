import React from 'react';
import { Link } from 'react-router-dom';

import { Stack, Typography } from '@mui/material';

import viteLogo from '@app/assets/vite.svg';
import { paths } from '@app/routes/paths';

type HeaderLogoType = {
  font_size?: string;
  img_size?: number;
};

const HeaderLogo = ({ font_size = '38px', img_size = 16 }: HeaderLogoType): JSX.Element => {
  return (
    <Link to={paths.index} className='my-auto no-underline mr-8'>
      <Stack flexDirection={'row'} gap={1} alignItems={'center'} className='max-w-[200px]'>
        <Typography
          variant='h5'
          component='h5'
          className='font-bold tracking-wider text-center text-blue-700 md:m-auto'
          sx={(theme) => ({
            [theme.breakpoints.down(400)]: {
              fontSize: '28px'
            },
            fontSize: {
              xs: '28px',
              md: font_size
            }
          })}>
          Vite
        </Typography>
        <img src={viteLogo} alt='Logo' className={`object-cover size-10 md:size-${img_size}`} />
        <Typography
          variant='h1'
          component='h1'
          className='font-bold tracking-wider text-center text-pink-500 md:m-auto'
          sx={(theme) => ({
            [theme.breakpoints.down(400)]: {
              fontSize: '28px'
            },
            fontSize: {
              xs: '28px',
              md: font_size
            }
          })}>
          Shop
        </Typography>
      </Stack>
    </Link>
  );
};

export default HeaderLogo;
