import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Logout } from '@mui/icons-material';
import { Stack } from '@mui/material';

import { useLogOut } from '@app/api/hooks/auth.hook';
import { clearUser } from '@app/redux/authSlice';
import { clearCart } from '@app/redux/cartSlice';
import { paths } from '@app/routes/paths';
import { IErrorResponse } from '@app/types/common';

const HeaderBoxHover = (): JSX.Element => {
  const dispatch = useDispatch();
  const { mutate: logOut } = useLogOut();
  const handleLogout = () => {
    logOut(
      {},
      {
        onSuccess: (data) => {
          dispatch(clearUser());
          dispatch(clearCart());
          toast.success(data.message);
        },
        onError: (error: IErrorResponse) => {
          toast.error(error.response.data.message);
        }
      }
    );
  };
  return (
    <Stack direction={'column'} className='w-full bg-white'>
      <Link to={'user/account'} className='px-2 py-4 m-0 text-blue-700 no-underline hover:bg-slate-200'>
        Account Info
      </Link>

      <Link to={paths.index} className='px-2 py-4 m-0 text-blue-700 no-underline hover:bg-slate-200'>
        Your Notification
      </Link>

      <Stack
        className='cursor-pointer hover:bg-slate-200'
        spacing={2}
        direction={'row'}
        alignItems={'center'}
        onClick={handleLogout}>
        <p className='px-2 py-4 m-0'>Log out</p>
        <Logout />
      </Stack>
    </Stack>
  );
};

export default HeaderBoxHover;
