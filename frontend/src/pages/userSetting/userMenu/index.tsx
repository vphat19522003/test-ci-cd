import { Link, useLocation } from 'react-router-dom';

import { Favorite, ManageAccounts, Map, Security, Share, ShoppingCart } from '@mui/icons-material';
import { Stack } from '@mui/material';

import { useDevice } from '@app/hooks/useDevice';
import { paths } from '@app/routes/paths';

const UserMenu = (): JSX.Element => {
  const { isMobile } = useDevice();

  const pathName = useLocation().pathname;
  const activeStyle = 'border-l-8 border-l-blue-700 border-solid text-black';
  const mobileActiveStyle = 'border-x-0 border-t-0 border-b-6 border-solid border-b-blue-700 text-black';

  return (
    <>
      {!isMobile ? (
        <Stack direction='column' className='bg-white rounded-md shadow-md overflow-hidden'>
          <Link
            to={paths.user.account}
            className={`no-underline p-4 border-x-0 border-t-0 border-b-[0.1px] border-solid border-b-gray-200 hover:text-black ${pathName === '/user/account' ? activeStyle : 'text-[#6e7480]'}`}>
            <Stack direction={'row'} spacing={4} alignItems={'center'}>
              <ManageAccounts />
              <p>Account</p>
            </Stack>
          </Link>
          <Link
            to={paths.user.history}
            className={`no-underline p-4 border-x-0 border-t-0 border-b-[0.1px] border-solid border-b-gray-200 hover:text-black ${pathName === '/user/order_history' ? activeStyle : 'text-[#6e7480]'}`}>
            <Stack direction={'row'} spacing={4} alignItems={'center'}>
              <ShoppingCart />
              <p> Purchased History</p>
            </Stack>
          </Link>
          <Link
            to={paths.user.security}
            className={`no-underline p-4 text-[#6e7480] border-x-0 border-t-0 border-b-[0.1px] border-solid border-b-gray-200 hover:text-black ${pathName === '/user/security' ? activeStyle : 'text-[#6e7480]'}`}>
            <Stack direction={'row'} spacing={4} alignItems={'center'}>
              <Security />
              <p>Security</p>
            </Stack>
          </Link>
          <Link
            to={paths.user.address}
            className={`no-underline p-4 text-[#6e7480] border-x-0 border-t-0 border-b-[0.1px] border-solid border-b-gray-200 hover:text-black ${pathName === '/user/address' ? activeStyle : 'text-[#6e7480]'}`}>
            <Stack direction={'row'} spacing={4} alignItems={'center'}>
              <Map />
              <p>Shipping Address</p>
            </Stack>
          </Link>
          <Link
            to={paths.user.favorite}
            className={`no-underline p-4 text-[#6e7480] border-x-0 border-t-0 border-b-[0.1px] border-solid border-b-gray-200 hover:text-black ${pathName === '/user/favorite' ? activeStyle : 'text-[#6e7480]'}`}>
            <Stack direction={'row'} spacing={4} alignItems={'center'}>
              <Favorite />
              <p>Favorite</p>
            </Stack>
          </Link>
          <Link
            to={paths.user.share}
            className={`no-underline p-4 border-x-0 border-y-0 hover:text-black ${pathName === '/user/share' ? activeStyle : 'text-[#6e7480]'}`}>
            <Stack direction={'row'} spacing={4} alignItems={'center'}>
              <Share />
              <p>Share</p>
            </Stack>
          </Link>
        </Stack>
      ) : (
        <Stack className='bg-white rounded-md shadow-md w-full' direction={'row'}>
          <Link
            to={paths.user.account}
            className={`flex-1 no-underline p-4 hover:text-black ${pathName === '/user/account' ? mobileActiveStyle : 'text-[#6e7480]'}`}>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
              <ManageAccounts />
            </Stack>
          </Link>
          <Link
            to={paths.user.history}
            className={`flex-1 no-underline p-4 hover:text-black ${pathName === '/user/order_history' ? mobileActiveStyle : 'text-[#6e7480]'}`}>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
              <ShoppingCart />
            </Stack>
          </Link>
          <Link
            to={paths.user.security}
            className={`flex-1 no-underline p-4 hover:text-black ${pathName === '/user/security' ? mobileActiveStyle : 'text-[#6e7480]'}`}>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
              <Security />
            </Stack>
          </Link>
          <Link
            to={paths.user.address}
            className={`flex-1 no-underline p-4 hover:text-black ${pathName === '/user/address' ? mobileActiveStyle : 'text-[#6e7480]'}`}>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
              <Map />
            </Stack>
          </Link>
          <Link
            to={paths.user.favorite}
            className={`flex-1 no-underline p-4 hover:text-black ${pathName === '/user/favorite' ? mobileActiveStyle : 'text-[#6e7480]'}`}>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
              <Favorite />
            </Stack>
          </Link>
          <Link
            to={paths.user.share}
            className={`flex-1 no-underline p-4 hover:text-black ${pathName === '/user/share' ? mobileActiveStyle : 'text-[#6e7480]'}`}>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
              <Share />
            </Stack>
          </Link>
        </Stack>
      )}
    </>
  );
};

export default UserMenu;
