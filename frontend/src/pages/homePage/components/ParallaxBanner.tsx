import HeaderLogo from '@app/components/molecules/headerLogo';

const ParallaxBanner = (): JSX.Element => {
  return (
    <div className='bg-parallax'>
      <div className='relative z-10 flex items-center justify-center h-full '>
        <div className='flex flex-col justify-center text-center'>
          <div className='mx-auto'>
            <HeaderLogo font_size='36px' img_size={15} />
          </div>
          <p className='!my-0 text-4xl text-white'>"Your One-Stop Shop for Everything You Love."</p>
        </div>
      </div>
    </div>
  );
};

export default ParallaxBanner;
