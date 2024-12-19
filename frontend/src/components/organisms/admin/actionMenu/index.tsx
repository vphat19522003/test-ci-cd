import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { Lock, Person, PowerSettingsNew, Settings } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';

import { useLogOut } from '@app/api/hooks/auth.hook';
import { clearUser } from '@app/redux/authSlice';
import { IErrorResponse } from '@app/types/common';

import ConfirmPopup, { IDialogRef } from '../../confirmPopup';

const ActionMenu = (): JSX.Element => {
  const { mutate: logOut } = useLogOut();
  const dialogConfirmRef = useRef<IDialogRef>(null);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dialogConfirmRef.current?.show(() =>
      logOut(
        {},
        {
          onSuccess: (data) => {
            dispatch(clearUser());
            window.location.href = '/login';
            toast.success(data.message);
          },
          onError: (err: IErrorResponse) => {
            toast.error(err.response.data.message as string);
          }
        }
      )
    );
  };
  return (
    <>
      <Stack direction={'column'} className='text-[#39465f] cursor-pointer '>
        <Stack direction={'row'}>
          <Stack
            justifyContent={'center'}
            alignItems={'center'}
            className='w-[60px] p-6 border-[0.5px] border-solid border-slate-200 border-t-0 border-l-0 border-r-0 hover:text-blue-700'>
            <Person />
            <Typography>Account</Typography>
          </Stack>
          <Stack
            justifyContent={'center'}
            alignItems={'center'}
            className='w-[60px] p-6 border-[0.5px] border-solid border-slate-200 border-t-0 border-r-0'>
            <Settings />
            <Typography>Settings</Typography>
          </Stack>
        </Stack>
        <Stack direction='row'>
          <Stack
            justifyContent={'center'}
            alignItems={'center'}
            className='w-[60px] p-6 border-slate-200 border-t-0 border-l-0 border-solid border-[0.5px] border-b-0'>
            <Lock />
            <Typography>Lock</Typography>
          </Stack>
          <Stack
            justifyContent={'center'}
            alignItems={'center'}
            className='w-[60px] p-6 hover:text-red-600'
            onClick={handleLogout}>
            <PowerSettingsNew />
            <Typography>Logout</Typography>
          </Stack>
        </Stack>
      </Stack>
      <ConfirmPopup title='Warning' ref={dialogConfirmRef}>
        Are you sure you want to logout ?
      </ConfirmPopup>
    </>
  );
};

export default ActionMenu;
