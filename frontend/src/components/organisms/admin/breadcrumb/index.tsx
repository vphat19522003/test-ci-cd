import { Link, useLocation } from 'react-router-dom';

import { Home } from '@mui/icons-material';
import { Breadcrumbs, Stack, Typography } from '@mui/material';

const Breadcrumb = (): JSX.Element => {
  const location = useLocation();
  const path = location.pathname.split('/').filter((x) => x);

  const formatPathName = (path: string) => {
    if (path.includes('-')) {
      const pathArr = path.split('-');
      const pathName: string[] = [];

      pathArr.map((item) => {
        return pathName.push(item[0].toUpperCase() + item.slice(1, item.length));
      });

      return pathName.join(' ');
    }

    return path[0].toUpperCase() + path.slice(1, path.length);
  };
  return (
    <Breadcrumbs separator='›' aria-label='breadcrumb' className='mt-4 text-md'>
      <Link to={'/dashboard'} className='no-underline text-[#39465f] hover:text-blue-700'>
        <Stack direction={'row'} alignItems={'center'} spacing={1}>
          <Home className='text-blue-700 text-xl' />
          <p>Home</p>
        </Stack>
      </Link>
      {path.map((item, index) => {
        const lastItem = index === path.length - 1;
        const to = `/${path.slice(0, index + 1).join('/')}`;
        return !lastItem ? (
          <Link to={to} className='no-underline text-[#39465f] hover:text-blue-700' key={`${path + index.toString()}`}>
            {formatPathName(item)}
          </Link>
        ) : (
          <Typography key={to} className='text-md'>
            {formatPathName(item)}
          </Typography>
        );
      })}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
