import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

import { RouteItemConfig } from '@app/types/route';

const SidebarItem = ({ item }: { item: RouteItemConfig }): JSX.Element => {
  const [isHover, setIsHover] = useState(false);
  const location = useLocation();

  const isCurrentPath = location.pathname.includes(item.path);
  const haveParent = item.path.split('/').length > 2;
  const topParent = '/' + item.path.split('/')[1];

  return item.sidebarProps && item.path ? (
    <ListItemButton
      className={`rounded-lg mt-1 ${topParent && !haveParent && isCurrentPath && 'bg-[#e5f6fe]'}`}
      disabled={item.disabled}
      component={Link}
      to={item.path}
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
              // variant={'body'}
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
    </ListItemButton>
  ) : (
    <></>
  );
};

export default SidebarItem;
