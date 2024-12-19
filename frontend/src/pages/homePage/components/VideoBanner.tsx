const VideoParallax = {
  top: '0',
  left: '0',
  width: '100%',
  height: '100%'
};

const VideoBanner = (): JSX.Element => {
  return (
    <div className='relative block w-full h-full py-8 mt-4'>
      <div className='relative w-full h-[480px] overflow-hidden'>
        <video autoPlay muted loop className='absolute object-cover' style={VideoParallax}>
          <source
            src='https://res.cloudinary.com/dqgifmakd/video/upload/v1731508040/video/x65p3c4vsdm5d57vgeus.mp4'
            type='video/mp4'
          />
        </video>
      </div>

      <div className='absolute top-0 right-[0px] flex items-center bg-dark bottom-0 bg-opacity-30'>
        <p
          className='p-8 text-6xl font-bold leading-relaxed tracking-wide text-right text-white capitalize text-light'
          style={{ fontFamily: 'Nunito, sans-serif' }}>
          Fast <br /> Safe <br /> Convenient
        </p>
      </div>
    </div>
  );
};

export default VideoBanner;
