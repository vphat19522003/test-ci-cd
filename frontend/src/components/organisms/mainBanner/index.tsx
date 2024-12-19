import { Box, Stack } from '@mui/material';

import BannerSlider from '@app/components/molecules/bannerSlider';
import { useDevice } from '@app/hooks/useDevice';

const advImages = [
  'https://realestatemarket.com.mx/images/2023/02-febrero/06-02/Estrategias-ecommerce-para-los-pequenos-y-medianos-negocios.jpg',
  'https://www.smartsight.in/wp-content/uploads/2024/04/What-Is-an-E-Commerce-Coordinator.jpg',
  'https://static.dinamize.com.br/dinamizeszmsdg3x/uploads/2024/06/como-criar-ecommerce-do-zero.png'
];

const MainBanner = (): JSX.Element => {
  const { isMobile } = useDevice();

  return (
    <Box className={` bg-white py-4 ${isMobile && 'mt-[80px]'} h-[260px] sm:h-[320px] md:h-[440px]`}>
      <Stack direction='row' spacing={2} className='h-full px-2'>
        {!isMobile ? (
          <>
            <Box className='w-3/12'></Box>
            <Stack className='w-9/12' direction={'row'}>
              <Stack className='w-full h-full px-2' direction={'row'} spacing={2}>
                <Box className='w-full lg:w-9/12'>
                  <BannerSlider />
                </Box>
                <Stack className='hidden lg:h-full lg:w-3/12 lg:block' direction='column' spacing={2}>
                  {advImages.map((item, index) => (
                    <Box key={index} className='flex-1 w-full overflow-hidden h-[32%] rounded-2xl'>
                      <img src={item} alt={`image banner ${index}`} className='object-cover w-full h-full' />
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </>
        ) : (
          <Stack className='w-full h-full' direction={'column'} spacing={2}>
            <Box className='h-[70%]'>
              <BannerSlider />
            </Box>

            <Stack className='w-full h-[30%]' direction='row' spacing={2}>
              {advImages.map((item, index) => (
                <Box key={index} className='w-full h-full overflow-hidden rounded-xl'>
                  <img src={item} alt={`image banner ${index}`} className='object-cover w-full h-full' />
                </Box>
              ))}
            </Stack>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default MainBanner;
