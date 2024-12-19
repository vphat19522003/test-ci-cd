import { useState } from 'react';

import {
  ArrowDropDown,
  ArrowDropUp,
  Facebook,
  Google,
  Instagram,
  LocationCity,
  Mail,
  Phone,
  Send,
  Twitter,
  YouTube
} from '@mui/icons-material';
import { Box, Link, Stack, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';

import bctLogo from '@app/assets/footer_logobct_img.png';
import viteLogo from '@app/assets/vite.svg';
import InputField from '@app/components/atoms/inputField';
import { CustomIconButton } from '@app/components/molecules/headerSearch';
import { useDevice } from '@app/hooks/useDevice';

interface FooterItemProps {
  title: string;
  content: React.ReactNode;
  isActive: boolean;
  isMobile: boolean;
  onToggle: () => void;
}

const FooterItem = ({ title, content, isActive, onToggle, isMobile }: FooterItemProps): JSX.Element => {
  return (
    <Box>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        className={`p-2 ${isMobile && 'border-b-[0.5px] border-solid'} border-x-0 border-t-0 border-gray-200`}
        onClick={onToggle}>
        {<Typography>{title}</Typography>}
        {isMobile && (
          <Stack className='py-2'>
            {isActive ? <ArrowDropUp className='text-blue-700' /> : <ArrowDropDown className='text-blue-700' />}
          </Stack>
        )}
      </Stack>
      {/* AnimatePresence ensures smooth entry and exit animations */}
      <AnimatePresence initial={false}>
        {(isActive || !isMobile) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}>
            <Stack direction={'column'} className='p-2'>
              {content}
            </Stack>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

const Footer = (): JSX.Element => {
  const [footerItem, setFooterItem] = useState({
    footerItem1: { id: 1, isActive: false },
    footerItem2: { id: 2, isActive: false },
    footerItem3: { id: 3, isActive: false },
    footerItem4: { id: 4, isActive: false }
  });

  const { isMobile } = useDevice();

  const handleToggle = (id: string) => {
    setFooterItem((prevState) => ({
      ...prevState,
      [id]: { ...prevState[id], isActive: !prevState[id].isActive }
    }));
  };

  return (
    <Stack className='w-full'>
      <Stack
        className='w-full py-6 text-white bg-blue-700 text-md md:text-lg'
        alignItems={'center'}
        direction={'column'}>
        <Stack direction={'row'} alignItems={'center'} textAlign={'center'} spacing={2}>
          <Send />
          <p>Register your email to receive new information</p>
        </Stack>
        <p>To receive new information about products and sale event</p>
        <InputField
          className='w-full border-8'
          startAdornment={<Mail className='text-pink-500' />}
          placeholder='Enter your email address'
          endAdornment={<CustomIconButton>Register</CustomIconButton>}
          variant='outlined'
          borderColorFocus='blue.700'
          backgroundColor='white'
        />
      </Stack>
      <Box className='px-2 py-4 lg:px-28 xl:px-80'>
        <Stack
          direction={isMobile ? 'column' : 'row'}
          className='bottom-0 left-0 w-full'
          justifyContent={isMobile ? 'flex-start' : 'space-between'}>
          <Box className='flex-1'>
            <FooterItem
              title='About us'
              content={
                <>
                  <p className='text-gray-500 text-md'>Trang thương mại chính thức của Vite Shop.</p>
                  <Stack direction={'row'} spacing={2}>
                    <img src={bctLogo} alt='Logo' className='object-container' />
                    <img src={viteLogo} alt='Logo' className='object-container' />
                  </Stack>
                  <Stack direction={'row'} alignItems={'center'} className='mt-2' spacing={1}>
                    <Link>
                      <Facebook />
                    </Link>
                    <Link>
                      <Twitter />
                    </Link>
                    <Link>
                      <Instagram />
                    </Link>
                    <Link>
                      <Google />
                    </Link>
                    <Link>
                      <YouTube />
                    </Link>
                  </Stack>
                </>
              }
              isActive={footerItem.footerItem1.isActive}
              onToggle={() => handleToggle('footerItem1')}
              isMobile={isMobile}
            />
          </Box>
          <Box className='flex-1'>
            <FooterItem
              title='Contact Information'
              content={
                <>
                  <ul className='pl-4 space-y-2 text-gray-500 text-md'>
                    <li>
                      <Stack direction={'row'} spacing={2} alignItems={'center'}>
                        <LocationCity />
                        <p>CS1: 180D Thái Thịnh - Đống Đa - HN</p>
                      </Stack>
                    </li>
                    <li>
                      <Stack direction={'row'} spacing={2} alignItems={'center'}>
                        <Phone />
                        <p>0968 239 497 - 097 221 6881</p>
                      </Stack>
                    </li>
                    <li>
                      <Stack direction={'row'} spacing={2} alignItems={'center'}>
                        <Mail />
                        <p>ttgshoponline@gmail.com</p>
                      </Stack>
                    </li>
                  </ul>
                </>
              }
              isActive={footerItem.footerItem2.isActive}
              onToggle={() => handleToggle('footerItem2')}
              isMobile={isMobile}
            />
          </Box>
          <Box className='flex-1'>
            <FooterItem
              title='Bank Account'
              content={
                <>
                  <ul className='pl-4 space-y-2 text-gray-500 text-md'>
                    <li>Tài khoản ngân hàng</li>
                    <li>Tìm kiếm</li>
                    <li>Phương thức thanh toán</li>
                  </ul>
                </>
              }
              isActive={footerItem.footerItem3.isActive}
              onToggle={() => handleToggle('footerItem3')}
              isMobile={isMobile}
            />
          </Box>
          <Box className='flex-1'>
            <FooterItem
              title='Policy'
              content={
                <>
                  <ul className='pl-4 space-y-2 text-gray-500 text-md'>
                    <li>Chính Sách Bảo Mật</li>
                    <li>Qui Định Bảo Hành</li>
                    <li>Chính Sách Đổi Trả</li>
                    <li>Điều khoản sử dụng</li>
                    <li>Chính sách vận chuyển & kiểm hàng</li>
                  </ul>
                </>
              }
              isActive={footerItem.footerItem4.isActive}
              onToggle={() => handleToggle('footerItem4')}
              isMobile={isMobile}
            />
          </Box>
        </Stack>
      </Box>

      <Box className='px-2 border-b-0 border-gray-200 border-x-0 border-t-[0.5px] border-solid'>
        <p className='text-sm leading-4 text-center text-gray-500'>
          Copyright © 2024 Bản quyền của Công ty cổ phần Mocato Việt Nam
        </p>
      </Box>
    </Stack>
  );
};

export default Footer;
