import { AccountCircle, Notifications, Settings, WbSunny } from '@mui/icons-material';
import { Box, IconButton, Stack } from '@mui/material';

const AdminHeaderAction = (): JSX.Element => {
  return (
    <Box>
      <Stack direction={'row'} spacing={2} alignItems={'center'}>
        <IconButton>
          <WbSunny className='text-yellow-300' />
        </IconButton>
        <IconButton>
          <Settings className='animate-spin-slow' />
        </IconButton>
        <IconButton>
          <Notifications />
        </IconButton>
        <IconButton>
          <AccountCircle />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default AdminHeaderAction;
