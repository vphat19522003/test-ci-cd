import { Stack, Typography } from '@mui/material';

import BestPrice from '@app/assets/WhyChooseUsImages/best-price.png';
import Compare from '@app/assets/WhyChooseUsImages/compare.png';
import Shipping from '@app/assets/WhyChooseUsImages/free-shipping.png';
import { useDevice } from '@app/hooks/useDevice';

const WhyChooseUsBanner = (): JSX.Element => {
  const { isMobile } = useDevice();
  return (
    <Stack className={`${isMobile && 'pl-2'} py-6 `}>
      {isMobile && (
        <Typography variant='h6' className='italic font-bold text-pink-500 highlight-animation max-w-fit'>
          WHY CHOOSE US
        </Typography>
      )}

      <Stack direction={'row'} className='w-full mt-4' spacing={4}>
        {!isMobile && (
          <Stack className='flex-1'>
            <Typography variant='h6' className='italic font-bold text-pink-500 highlight-animation max-w-fit'>
              WHY CHOOSE US
            </Typography>
            <Typography className='my-4 text-2xl font-bold text-blue-700'>
              Top Values <br /> For You
            </Typography>
            <Typography className='text-[#394E6A]'>
              Try a variety of benefits when
              <br /> using our services.
            </Typography>
          </Stack>
        )}

        <Stack className='flex-1'>
          <img src={Compare} alt='banner' className={`floatedImage ${isMobile ? 'size-16' : 'size-20'}`} />
          <Typography className='mt-6 text-2xl font-bold text-blue-700'>Lots of Choices</Typography>
          <Typography className='text-[#394E6A]'>Lots of category product for your choice</Typography>
        </Stack>
        <Stack className='flex-1'>
          <img src={BestPrice} alt='banner' className={`floatedImage ${isMobile ? 'size-16' : 'size-20'}`} />
          <Typography className='mt-4 text-2xl font-bold text-blue-700'>Best Price</Typography>
          <Typography className='text-[#394E6A]'>Best price and sale in the world</Typography>
        </Stack>
        <Stack className='flex-1'>
          <img src={Shipping} alt='banner' className={`floatedImage ${isMobile ? 'size-16' : 'size-20'}`} />
          <Typography className='text-2xl font-bold text-blue-700 mt-7'>Fast shipping</Typography>
          <Typography className='text-[#394E6A]'>Speedy delivery right to your door</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default WhyChooseUsBanner;
