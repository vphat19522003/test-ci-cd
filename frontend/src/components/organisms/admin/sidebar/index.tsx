import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AccountCircle, Apps } from '@mui/icons-material';
import { Box, IconButton, List, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';

import HeaderLogo from '@app/components/molecules/headerLogo';
import { useDevice } from '@app/hooks/useDevice';
import { toggleAdminSidebar } from '@app/redux/uiSlice';
import { adminRoute } from '@app/routes/paths';
import { RootState } from '@app/store';

import ActionMenu from '../actionMenu';
import SidebarItem from './components/SidebarItem';
import SidebarItemCollapse from './components/SidebarItemCollapse';

const ListMenuItem = React.memo((): JSX.Element => {
  const itemEle = useMemo(() => {
    return adminRoute.map((route, index) => {
      if (route.groupName) {
        return (
          <Box key={route.groupName + index}>
            <Typography>{route.groupName}</Typography>
          </Box>
        );
      } else {
        return route.sidebarProps ? (
          route.child ? (
            <SidebarItemCollapse item={route} key={index + route.path} />
          ) : (
            <SidebarItem item={route} key={index + route.path} />
          )
        ) : null;
      }
    });
  }, []);

  return (
    <>
      <List>{itemEle}</List>
    </>
  );
});

const AdminSidebar = (): JSX.Element => {
  const [openActionMenu, setOpenActionMenu] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const showAdminSidebar = useSelector((state: RootState) => state.ui.showAdminSidebar);
  const dispatch = useDispatch();
  const { isMobile } = useDevice();

  return (
    <>
      {showAdminSidebar && isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className='fixed inset-0 z-40 bg-gray-700'
          onClick={() => {
            dispatch(toggleAdminSidebar());
            setOpenActionMenu(false);
          }}
        />
      )}
      <Stack
        className={`shadow-md fixed top-0 h-full bg-white w-64 z-40 duration-300 ease-in-out overflow-hidden ${showAdminSidebar ? 'left-0' : 'left-[-100%]'}`}>
        <Box className='px-4 pt-6 mx-auto '>
          <HeaderLogo font_size='32px' />
        </Box>

        <Box className='flex-grow px-4 scrollable-content'>
          <Box className='w-56'>
            <ListMenuItem />
          </Box>
        </Box>
        <Stack
          direction={'row'}
          alignItems={'center'}
          className='shadow-sm p-4 border-t-[0.5px] border-[#dbe0e5] border-solid border-x-0 border-b-0'>
          <Stack className='w-3/12'>
            <AccountCircle fontSize='large' className='mr-2 text-blue-700' />
          </Stack>
          <Stack className='w-7/12'>
            <Typography variant='h6' className='text-xl'>
              {user?.fullName}
            </Typography>
            <Typography variant='caption' className='text-gray-400'>
              {user?.role}
            </Typography>
          </Stack>
          <Stack className='w-2/12'>
            <IconButton
              className='hover:text-[#ffd328] transition-all duration-300 relative'
              onClick={() => setOpenActionMenu((prev) => !prev)}>
              <Apps />
            </IconButton>
            {openActionMenu && (
              <Box className='absolute shadow-2xl  bottom-16 right-6 bg-white rounded-lg border-[0.5px] border-solid border-slate-200'>
                <ActionMenu />
              </Box>
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default AdminSidebar;
