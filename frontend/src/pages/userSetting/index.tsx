import { Outlet } from 'react-router-dom';

import { Box, Stack } from '@mui/material';

import { useDevice } from '@app/hooks/useDevice';

import UserMenu from './userMenu';

const UserSetting = (): JSX.Element => {
  const { isMobile } = useDevice();
  return (
    <Stack
      direction={isMobile ? 'column' : 'row'}
      className='py-4 h-full'
      spacing={isMobile ? 2 : 8}
      alignItems={'flex-start'}>
      <Box className={`${isMobile ? 'w-full' : 'w-3/12'} h-full`}>
        <UserMenu />
      </Box>
      <Box
        className={`${isMobile ? 'w-full' : 'w-9/12 px-5 ml-6'} bg-white rounded-md overflow-hidden shadow-md min-h-[460px]`}>
        <Outlet />
      </Box>
    </Stack>
  );
};

export default UserSetting;
