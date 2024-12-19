import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Box, Stack } from '@mui/material';

import Loader from '@app/components/molecules/loader';
import Breadcrumb from '@app/components/organisms/admin/breadcrumb';
import AdminHeader from '@app/components/organisms/admin/header';
import AdminSidebar from '@app/components/organisms/admin/sidebar';
import ScrollToTopButton from '@app/components/organisms/scrollToTopButton';
import { useDevice } from '@app/hooks/useDevice';
import { RootState } from '@app/store';

type MainLayoutPropsType = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: MainLayoutPropsType): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);
  const showAdminSidebar = useSelector((state: RootState) => state.ui.showAdminSidebar);
  const isPending = useSelector((state: RootState) => state.ui.isPending);
  const location = useLocation();
  const { isMobile } = useDevice();

  useEffect(() => {
    if (window.scrollY !== 0) {
      window.scrollTo({
        top: 0,
        left: 0
      });
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      {isPending && <Loader />}
      <Stack direction={'row'}>
        {/* Sidebar */}
        {showAdminSidebar && <AdminSidebar />}
        {/* Main content */}
        <Stack
          direction={'column'}
          className={`transition-all duration-200 ease-in-out block w-full px-6 ${showAdminSidebar ? (isMobile ? 'ml-0' : 'ml-64') : 'ml-0'}`}>
          <AdminHeader />
          {/* Nội dung trang bên dưới header */}
          <Box className='px-2 pt-16 pb-8 '>
            <Breadcrumb />
            {children}
          </Box>
        </Stack>
      </Stack>
      {isVisible && <ScrollToTopButton />}
    </>
  );
};

export default AdminLayout;
