import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

import { RouteItemConfig } from '@app/types/route';

import SidebarItem from './SidebarItem';

const SidebarItemCollapse = ({ item }: { item: RouteItemConfig }): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const location = useLocation();
  const isCurrentPath = location.pathname.includes(item.path);
  const haveParent = item.path.split('/').length > 2;
  const topParent = '/' + item.path.split('/')[1];

  useEffect(() => {
    if (isCurrentPath) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isCurrentPath]);
  return (
    <Box>
      <ListItemButton
        className={`rounded-lg mt-1 ${topParent && !haveParent && isCurrentPath && 'bg-[#e5f6fe]'}`}
        disabled={item.disabled}
        onClick={() => setOpen((prev) => !prev)}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}>
        {item.sidebarProps?.icon && (
          <ListItemIcon
            className={` ${haveParent ? (isHover || isCurrentPath ? 'text-pink-500' : 'text-slate-400') : 'text-pink-500'}`}>
            {item.sidebarProps.icon}
          </ListItemIcon>
        )}
        {item.sidebarProps?.displayText && (
          <ListItemText
            primary={
              <Typography
                fontSize={14}
                className={`${isCurrentPath ? 'text-blue-700 font-bold' : 'text-[#39465f]'} ${haveParent ? '-ml-10' : '-ml-6'} hover:text-blue-700`}
                sx={{
                  alignSelf: 'center',
                  fontWeight: '500'
                  // '&:hover': {
                  //   fontWeight: 'bold'
                  // }
                }}>
                {item.sidebarProps.displayText}
              </Typography>
            }
          />
        )}
        {topParent === item.path ? (
          open ? (
            <ExpandLess className='text-pink-500' />
          ) : (
            <ExpandMore className='text-pink-500' />
          )
        ) : null}
      </ListItemButton>
      <Collapse in={open} timeout={500} unmountOnExit>
        <List
          component='div'
          disablePadding
          sx={{
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              left: '2rem',
              top: 0,
              height: '100%',
              width: '1px',
              opacity: 0.25,
              background: '#5684BF'
            }
          }}>
          <Box sx={{ ml: '2rem' }}>
            {item.child?.map((route, index) =>
              route.sidebarProps ? (
                route.child ? (
                  <SidebarItemCollapse item={route} key={index} />
                ) : (
                  <SidebarItem item={route} key={index} />
                )
              ) : null
            )}
          </Box>
        </List>
      </Collapse>
    </Box>
  );
};

export default SidebarItemCollapse;
