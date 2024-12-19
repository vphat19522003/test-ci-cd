import { Stack } from '@mui/material';

import MainBanner from '@app/components/organisms/mainBanner';
import { useDevice } from '@app/hooks/useDevice';

import ListProductBook from './components/ListProductBook';
import VideoBanner from './components/VideoBanner';

const HomePage = (): JSX.Element => {
  const { isMobile } = useDevice();

  return (
    <>
      <MainBanner />
      <Stack className={`${isMobile && 'pl-2'} py-6 `}>
        <ListProductBook />
        <ListProductBook />

        {/* <Typography>KHUYỂN MÃI SHOCK NHẤT</Typography>
            <Typography>TOP SẢN PHẨM BÁN CHẠY</Typography>
            <Typography>SẢN PHẨM MỚI</Typography>
            <Typography>BẠN CÓ THỂ THÍCH</Typography>
            <Typography>TOYS</Typography>
            <Typography>GAME</Typography>
            <Typography>ELECTRONICS</Typography>
            <Typography>FOOD</Typography> */}

        {/* <WhyChooseUsBanner /> */}
        {/* <ParallaxBanner /> */}
        <VideoBanner />
      </Stack>
    </>
  );
};

export default HomePage;
