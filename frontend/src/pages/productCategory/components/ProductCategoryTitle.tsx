import { Stack, Typography } from '@mui/material';

const ProductCategoryTitle = ({ title }: { title: string }): JSX.Element => {
  return (
    <Stack
      className='bg-white rounded-lg px-4 py-3'
      style={{
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)'
      }}>
      <Typography className='text-3xl font-bold'>{title.slice(0, 1).toUpperCase() + title.slice(1)}</Typography>
    </Stack>
  );
};

export default ProductCategoryTitle;
