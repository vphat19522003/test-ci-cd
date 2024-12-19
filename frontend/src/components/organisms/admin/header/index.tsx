import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Menu } from '@mui/icons-material';
import { AppBar, IconButton, Stack } from '@mui/material';

import AdminHeaderAction from '@app/components/molecules/admin/headerAction';
import { useDevice } from '@app/hooks/useDevice';
import { toggleAdminSidebar } from '@app/redux/uiSlice';
import { RootState } from '@app/store';

const AdminHeader = (): JSX.Element => {
  const [isScrolled, setIsScrolled] = useState(false);
  const showAdminSidebar = useSelector((state: RootState) => state.ui.showAdminSidebar);
  const dispatch = useDispatch();
  const { isMobile } = useDevice();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AppBar
      position='fixed'
      className={`shadow-sm bg-transparent px-6 py-3 transition-all duration-200 ease-in-out z-30 ${showAdminSidebar ? (isMobile ? 'w-full left-0' : 'left-64 w-[calc(100%-256px)]') : 'w-full left-0'}`}
      sx={{
        backdropFilter: isScrolled ? 'blur(7px)' : 'none',
        background: isScrolled ? '#f4f7fab3' : 'transparent'
      }}>
      <Stack direction={'row'} justifyContent={'space-between'} className='box-border w-full'>
        <IconButton onClick={() => dispatch(toggleAdminSidebar())}>
          <Menu />
        </IconButton>
        <AdminHeaderAction />
      </Stack>
    </AppBar>
  );
};

export default AdminHeader;
