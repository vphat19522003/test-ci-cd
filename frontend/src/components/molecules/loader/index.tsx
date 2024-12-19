import { Box, LinearProgress } from '@mui/material';

const Loader = (): JSX.Element => {
  return (
    <Box className='fixed top-0 left-0 z-[1000] w-full'>
      <LinearProgress color='primary' />
    </Box>
  );
};

export default Loader;
