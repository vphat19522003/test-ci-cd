import React, { useCallback, useRef, useState } from 'react';

import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Stack } from '@mui/material';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

const images = [
  'https://cdn.shopify.com/s/files/1/0070/7032/files/ecommerce_20platforms.png?v=1701447416',
  'https://cdn.shopify.com/s/files/1/0070/7032/files/ecommerce_20agency.png?v=1697794256',
  'https://creatives.me/wp-content/uploads/2023/03/ecommerce1.png'
];

const BannerSlider = (): JSX.Element => {
  const [isShowNavigator, setShowNavigator] = useState<boolean>(false);

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
    <Stack
      className='w-full h-full rounded-2xl overflow-hidden'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current
        }}
        pagination={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className='w-full h-full'
        loop={true}>
        {images.map((image, index) => (
          <SwiperSlide key={index} className='w-full h-full'>
            <img src={image} alt={`Slide ${index + 1}`} className='w-full h-full object-cover rounded-2xl' />
          </SwiperSlide>
        ))}

        {/* Custom button with smooth opacity transition */}
        <div
          ref={prevRef}
          className={`absolute top-1/2 left-2 transform -translate-y-1/2 z-10 cursor-pointer transition-opacity duration-300 ${isShowNavigator ? 'opacity-100' : 'opacity-0'}`}
          onClick={handlePrev}>
          <ArrowBack style={{ fontSize: 30, color: '#fff' }} />
        </div>
        <div
          ref={nextRef}
          className={`absolute top-1/2 right-2 transform -translate-y-1/2 z-10 cursor-pointer transition-opacity duration-300 ${isShowNavigator ? 'opacity-100' : 'opacity-0'}`}
          onClick={handleNext}>
          <ArrowForward style={{ fontSize: 30, color: '#fff' }} />
        </div>
      </Swiper>
    </Stack>
  );
};

export default BannerSlider;
