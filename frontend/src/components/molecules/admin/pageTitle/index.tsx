import { useLocation } from 'react-router-dom';

import { Stack, Typography } from '@mui/material';

const PageTitle = ({ icon }: { icon?: React.ReactNode }): JSX.Element => {
  const location = useLocation();
  const path = location.pathname.split('/').filter((x) => x);
  const lastPathName = path[path.length - 1];

  const formatTitlePage = (path: string) => {
    if (path.includes('-')) {
      const pathArr = path.split('-');

      return pathArr.map((item) => item[0].toUpperCase() + item.slice(1, item.length)).join(' ');
    }

    return path[0].toUpperCase() + path.slice(1, path.length);
  };
  return (
    <Stack direction={'row'} spacing={2} alignItems={'center'}>
      {icon}
      <Typography variant='h5' className='font-medium py-2 '>
        {formatTitlePage(lastPathName)}
      </Typography>
    </Stack>
  );
};

export default PageTitle;
