import { toast } from 'react-toastify';

import { Divider, Stack, Typography } from '@mui/material';

import { useChangePassword } from '@app/api/hooks/user.hook';
import { IErrorResponse } from '@app/types/common';

import { SecurityPasswordType } from './components/schemas';
import SecurityPasswordForm from './components/securityPasswordForm';

const UserSecurity = (): JSX.Element => {
  const { mutate: ChangePasswordMutate } = useChangePassword();

  const handleChangePassword = (value: SecurityPasswordType) => {
    ChangePasswordMutate(value, {
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (err: IErrorResponse) => {
        toast.error(err.response.data.message as string);
      }
    });
  };

  return (
    <Stack spacing={2} className='p-5'>
      <Stack>
        <Typography variant='h5' className='pb-4'>
          Security
        </Typography>
        <Typography variant='caption' className='text-md text-gray-400'>
          For safety, Vite Shop encourages customers to use strong passwords
        </Typography>
        <Divider orientation='horizontal' className='mt-5' />
      </Stack>

      <SecurityPasswordForm handleChangePassword={handleChangePassword} />
    </Stack>
  );
};

export default UserSecurity;
