import { useState } from 'react';
import { Link } from 'react-router-dom';

import { AutoStories } from '@mui/icons-material';
import { Stack, Tab, Tabs, Typography } from '@mui/material';

import CustomTabPanel from '@app/components/organisms/customTabPanel';

import AllLatestProduct from './AllLatestProduct';

const ListProductBook = (): JSX.Element => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Stack className='mt-6'>
      <Stack direction={'row'} spacing={2} alignItems={'center'}>
        <Typography variant='h6' className='font-bold text-pink-500'>
          BOOKS
        </Typography>
        <AutoStories className='text-pink-500' />
      </Stack>

      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs aria-label='basic tabs example' value={value} onChange={handleChange}>
          <Tab label='All' />
          <Tab label='Novel' />
          <Tab label='Comic' />
          <Tab label='Life skill' />
        </Tabs>
        <Link
          to={'/category/book'}
          className='px-4 py-1 text-white no-underline bg-blue-700 rounded-xl text-md hover:bg-blue-600'>
          More
        </Link>
      </Stack>
      <CustomTabPanel value={value} index={0}>
        <AllLatestProduct />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}></CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Stack>
  );
};

export default ListProductBook;
