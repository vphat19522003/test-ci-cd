import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { List } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';

import { useDevice } from '@app/hooks/useDevice';
import { RootState } from '@app/store';

const Sidebar = (): JSX.Element => {
  const location = useLocation();
  const checkPath = ['user', 'product', 'category', 'cart'];
  const isActivePath = checkPath.includes(location.pathname.split('/')[1]);

  const [isHovering, setIsHovering] = useState<boolean>(!isActivePath);
  const mainCategories = useSelector((state: RootState) => state.category.mainCategory);
  const { isMobile } = useDevice();

  const handleMouseLeave = () => {
    if (isActivePath) setIsHovering(false);
  };

  const handleMouseEnter = () => {
    if (isActivePath) setIsHovering(true);
  };

  useEffect(() => {
    if (isActivePath) setIsHovering(false);
    else {
      setIsHovering(true);
    }
  }, [isActivePath]);
  return (
    <Stack
      direction={'column'}
      className={`relative ${!isActivePath ? 'shadow-md bg-blue-700 text-white' : 'bg-blue-700 text-white'}`}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}>
      <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={2}
        className={`border-b-[1px] border-solid border-t-0 border-x-0 border-gray-100 py-2 pl-2 ${isActivePath && 'cursor-pointer'}`}>
        <List className='text-white' />
        <Typography variant='h5' className={'py-1 text-xl font-bold text-white'}>
          Menu
        </Typography>
      </Stack>
      {isHovering && (
        <Stack
          direction={'column'}
          className={`absolute top-full left-0 transition-all duration-300 ease-in-out ${isHovering ? 'opacity-100 visible' : 'opacity-0 invisible'} bg-white w-full z-10 shadow-md rounded-br-lg rounded-bl-lg ${isMobile ? 'h-[220px] mt-[80px]' : 'h-[460px]'}`}>
          {mainCategories.map((category) => (
            <Link
              key={category._id}
              to={`/category/${category.name.toLowerCase().replace(/\s+/g, '')}`}
              className='no-underline'
              state={{
                categoryId: category._id
              }}>
              <Stack
                direction={'row'}
                spacing={2}
                className='py-2 pl-2 transition-all rounded-lg cursor-pointer hover:bg-blue-100'
                alignItems={'center'}>
                <img
                  src={category.categoryImg.category_img_url}
                  alt={category.name}
                  className='object-contain size-10'
                />

                <Typography variant='h6' className='text-[#394E6A] text-md'>
                  {category.name}
                </Typography>
              </Stack>
            </Link>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default Sidebar;
