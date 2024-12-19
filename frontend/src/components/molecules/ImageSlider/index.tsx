import { useEffect, useState } from 'react';

const ImageSlider = (): JSX.Element => {
  const images = [
    'https://www.neothek.com/libs17/img/ecommerce/principal/ecommerce4.png',
    'https://ilimit.com/wp-content/uploads/2020/03/Mejorar-rendimiento-e-commerce.png',
    'https://blog-frontend.envato.com/cdn-cgi/image/width=2560,quality=75,format=auto/uploads/sites/2/2022/04/E-commerce-App-JPG-File-scaled.jpg'
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className='relative w-full h-full overflow-hidden'>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          className={`absolute object-cover w-full h-full transition-opacity duration-1000 ease-in-out ${currentIndex === index ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
    </div>
  );
};

export default ImageSlider;
