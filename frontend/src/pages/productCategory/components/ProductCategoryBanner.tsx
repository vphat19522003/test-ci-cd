import { Stack } from '@mui/material';

const ProductCategoryBanner = ({ banner_category }: { banner_category: string }): JSX.Element => {
  return (
    <Stack className='w-full max-h-[300px]'>
      <img src={banner_category} alt='Banner Category' className='object-cover w-full h-full' />
    </Stack>
  );
};

export default ProductCategoryBanner;
