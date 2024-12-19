import { useSelector } from 'react-redux';

import { Stack, Typography } from '@mui/material';

import { useDevice } from '@app/hooks/useDevice';
import { RootState } from '@app/store';

const GeneralInfo = (): JSX.Element => {
  const { isMobile } = useDevice();
  const user = useSelector((state: RootState) => state.auth.user);
  let date: Date;
  let formattedDate = '';
  if (user?.createdAt) {
    date = new Date(user?.createdAt);
    formattedDate = date.toLocaleDateString('en-GB');
  }

  return (
    <Stack spacing={4}>
      <Typography variant='h5'>General</Typography>
      <Stack spacing={6}>
        <Stack direction={isMobile ? 'column' : 'row'} spacing={6}>
          <Stack direction={isMobile ? 'row' : 'column'} spacing={isMobile ? 6 : 4} className='text-md'>
            <p className='w-28'>Username</p>
            <p className='font-black'>{user?.username}</p>
          </Stack>
          <Stack direction={isMobile ? 'row' : 'column'} spacing={isMobile ? 6 : 4} className='text-md'>
            <p className='w-28'>Email</p>
            <p className='font-black'>{user?.email}</p>
          </Stack>
          <Stack direction={isMobile ? 'row' : 'column'} spacing={isMobile ? 6 : 4} className='text-md'>
            <p className='w-28'>Full name</p>
            <p className='font-black'>{user?.fullName}</p>
          </Stack>
          <Stack direction={isMobile ? 'row' : 'column'} spacing={isMobile ? 6 : 4} className='text-md'>
            <p className='w-28'>Type of user</p>
            <p className='font-black'>Vip Silver</p>
          </Stack>
        </Stack>
        <Stack direction={isMobile ? 'column' : 'row'} spacing={6}>
          <Stack direction={isMobile ? 'row' : 'column'} spacing={isMobile ? 6 : 4} className='text-md'>
            <p className='w-28'>Accumulated</p>
            <p className='font-black'>2.000.000</p>
          </Stack>
          <Stack direction={isMobile ? 'row' : 'column'} spacing={isMobile ? 6 : 4} className='text-md'>
            <p className='w-28'>Account balance</p>
            <p className='font-black'>2.000</p>
          </Stack>
          <Stack
            direction={isMobile ? 'row' : 'column'}
            spacing={isMobile ? 6 : 4}
            className={`text-md ${!isMobile && 'ml-20'}`}>
            <p className='w-28'>Join date</p>
            <p className='font-black'>{formattedDate}</p>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default GeneralInfo;
