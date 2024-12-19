import { Link } from 'react-router-dom';

import { Home } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';

import viteImg from '@app/assets/vite.svg';
import ButtonForm from '@app/components/atoms/button';
import { paths } from '@app/routes/paths';

const NotFoundPage = (): JSX.Element => {
  return (
    <Stack alignItems={'center'} className='bg-[#fffff]'>
      <img src={viteImg} alt='Vite logo' className='size-80 relative mt-16' />
      <Stack justifyContent={'center'} alignItems={'center'} className='absolute top-72'>
        <Stack direction={'row'}>
          <Typography
            variant='h5'
            component='h5'
            className='font-bold tracking-wider text-center text-blue-700 md:m-auto'
            sx={(theme) => ({
              [theme.breakpoints.down(400)]: {
                fontSize: '120px'
              },
              fontSize: {
                fontSize: '120px'
              }
            })}>
            4
          </Typography>
          <Typography
            variant='h5'
            component='h5'
            className='font-bold tracking-wider text-center text-rose-50 md:m-auto'
            sx={(theme) => ({
              [theme.breakpoints.down(400)]: {
                fontSize: '120px'
              },
              fontSize: {
                fontSize: '120px'
              }
            })}>
            0
          </Typography>
          <Typography
            variant='h5'
            component='h5'
            className='font-bold tracking-wider text-center text-pink-500 md:m-auto'
            sx={(theme) => ({
              [theme.breakpoints.down(400)]: {
                fontSize: '120px'
              },
              fontSize: {
                fontSize: '120px'
              }
            })}>
            4
          </Typography>
        </Stack>
        <Stack direction={'row'}>
          <Typography
            variant='h5'
            component='h5'
            className='font-bold tracking-wider text-center text-slate-500 md:m-auto'
            sx={(theme) => ({
              [theme.breakpoints.down(400)]: {
                fontSize: '72px'
              },
              fontSize: {
                fontSize: '72px'
              }
            })}>
            Not found
          </Typography>
        </Stack>
        <ButtonForm>
          <Link to={paths.index} className='no-underline'>
            <Stack direction={'row'} alignItems={'center'} spacing={1}>
              <p> Click to back to home</p>
              <Home />
            </Stack>
          </Link>
        </ButtonForm>
      </Stack>
    </Stack>
  );
};

export default NotFoundPage;
