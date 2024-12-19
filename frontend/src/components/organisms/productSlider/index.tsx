import { useCallback, useRef, useState } from 'react';

import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Stack } from '@mui/material';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperRef } from 'swiper/react';

import { useDevice } from '@app/hooks/useDevice';

type ProductSliderProps = {
  children: React.ReactNode;
};

const ProductSlider = ({ children }: ProductSliderProps): JSX.Element => {
  const [isShowNavigator, setShowNavigator] = useState<boolean>(false);
  const { isMobile } = useDevice();

  const swiperRef = useRef<SwiperRef>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const handlePrev = useCallback(() => {
    if (!prevRef.current) return;
    swiperRef.current?.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!nextRef.current) return;
    swiperRef.current?.swiper.slideNext();
  }, []);

  const handleMouseLeave = useCallback(() => {
    setShowNavigator(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setShowNavigator(true);
  }, []);
  return (
    <Stack className='relative' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Swiper
        ref={swiperRef}
        slidesPerView={1}
        className='w-full h-full py-4'
        spaceBetween={20}
        pagination={{
          el: '.swiper-paginations',
          type: 'fraction'
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        modules={[Pagination, Navigation, Autoplay]}
        breakpoints={{
          0: {
            slidesPerView: 1
          },
          390: {
            slidesPerView: 1.5
          },
          502: {
            slidesPerView: 2
          },
          802: {
            slidesPerView: 2.5
          },
          992: {
            slidesPerView: 3
          },
          1200: {
            slidesPerView: 4
          }
        }}>
        {children}
      </Swiper>

      {/* Custom button with smooth opacity transition */}
      <div
        ref={prevRef}
        className={`absolute top-1/2 -left-6 transform -translate-y-1/2 z-10 cursor-pointer transition-opacity duration-300 bg-white shadow-lg rounded-full p-2 ${isShowNavigator ? 'opacity-100' : 'opacity-0'}`}
        onClick={handlePrev}>
        <ArrowBack className='text-2xl text-blue-700' />
      </div>

      <div
        ref={nextRef}
        className={`absolute top-1/2 ${!isMobile ? 'right-1' : '-right-4'}  transform -translate-y-1/2 z-10 cursor-pointer transition-opacity duration-300 bg-white shadow-lg rounded-full p-2 ${isShowNavigator ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleNext}>
        <ArrowForward className='text-2xl text-blue-700' />
      </div>
    </Stack>
  );
};

export default ProductSlider;
