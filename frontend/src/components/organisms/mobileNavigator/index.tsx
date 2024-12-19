import { Link, useNavigate } from 'react-router-dom';

import { ArrowBack, Home, Person } from '@mui/icons-material';
import { Box, Stack } from '@mui/material';

import { paths } from '@app/routes/paths';

const MobileNavigator = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <Box className='fixed bottom-0 left-0 z-30 w-full bg-white' sx={{ boxShadow: '0 -4px 6px rgba(0, 0, 0, 0.05)' }}>
      <Stack direction={'row'} justifyContent={'space-between'} className='px-4 py-2'>
        <Box>
          <ArrowBack onClick={() => navigate(-1)} className='hover:cursor-pointer' />
        </Box>
        <Box>
          <Link to={paths.index} className='text-black'>
            <Home />
          </Link>
        </Box>
        <Box>
          <Link to={'user/account'} className='text-black'>
            <Person />
          </Link>
        </Box>
      </Stack>
    </Box>
  );
};

export default MobileNavigator;
