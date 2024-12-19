import React, { useState } from 'react';

import { ArrowBackIos, ArrowForwardIos, Close } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

const ImageViewer = ({
  images,
  initialIndex = 0,
  onClose
}: {
  images: string[];
  initialIndex?: number;
  onClose: () => void;
}): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isSliding, setIsSliding] = useState(false);

  const handlePrev = () => {
    if (currentIndex > 0 && !isSliding) {
      setIsSliding(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex - 1);
        setIsSliding(false);
      }, 200);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1 && !isSliding) {
      setIsSliding(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setIsSliding(false);
      }, 200);
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99999
      }}>
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          color: 'white'
        }}>
        <Close />
      </IconButton>

      <IconButton
        onClick={handlePrev}
        sx={{
          position: 'absolute',
          left: '20px',
          color: 'white'
        }}
        disabled={currentIndex === 0}>
        <ArrowBackIos />
      </IconButton>

      <Box
        sx={{
          overflow: 'hidden',
          width: '80%',
          height: '80%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Box
          sx={{
            display: 'flex',
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: 'transform 0.2s ease-in-out',
            borderRadius: '8px',
            minWidth: '100%'
          }}>
          {images.map((image, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexShrink: 0,
                width: '100%',
                alignItems: 'center'
              }}>
              <img
                src={image}
                className='mx-auto'
                alt={`Image ${index}`}
                style={{
                  width: '300px',
                  height: 'auto',
                  objectFit: 'cover'
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>

      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          right: '20px',
          color: 'white'
        }}
        disabled={currentIndex === images.length - 1}>
        <ArrowForwardIos />
      </IconButton>

      <Typography
        sx={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          color: 'white',
          fontSize: '16px'
        }}>
        {`${currentIndex + 1} of ${images.length} images`}
      </Typography>
    </Box>
  );
};

export default ImageViewer;
