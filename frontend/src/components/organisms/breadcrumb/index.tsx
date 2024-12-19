import { Link } from 'react-router-dom';

import { Home } from '@mui/icons-material';
import { Breadcrumbs, Stack, Typography } from '@mui/material';

type BreadCrumbProps = {
  mainCategory: string;
  subCategories: string[];
  productName?: string;
  isCategory?: boolean;
};

const BreadCrumb = ({
  mainCategory = '',
  subCategories = [],
  productName = '',
  isCategory
}: BreadCrumbProps): JSX.Element => {
  return (
    <Breadcrumbs separator='>' aria-label='breadcrumb' className='py-4 text-md'>
      <Link to={'/'} className='no-underline text-[#39465f] hover:text-blue-700'>
        <Stack direction={'row'} alignItems={'center'} spacing={1}>
          <Home className='text-xl text-blue-700' />
          <p>Home</p>
        </Stack>
      </Link>
      <Link
        to={`${isCategory ? '/category/' + mainCategory : '/' + mainCategory}`}
        className='no-underline text-[#39465f] hover:text-blue-700'>
        {mainCategory?.slice(0, 1).toUpperCase() + mainCategory?.slice(1)}
      </Link>
      {subCategories?.map((subCategories, index) => (
        <Link to={'/'} className='no-underline text-[#39465f] hover:text-blue-700' key={index}>
          {subCategories?.slice(0, 1).toUpperCase() + subCategories?.slice(1)}
        </Link>
      ))}
      {productName && <Typography className='text-md'>{productName}</Typography>}
    </Breadcrumbs>
  );
};

export default BreadCrumb;
