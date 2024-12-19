import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, Stack, Typography } from '@mui/material';

import ButtonForm from '@app/components/atoms/button';
import InputField from '@app/components/atoms/inputField';
import { useDevice } from '@app/hooks/useDevice';

import { SecurityPasswordSchema, SecurityPasswordType } from './schemas';

type SecurityPasswordFormPropsType = {
  handleChangePassword: (formValue: SecurityPasswordType) => void;
};

const SecurityPasswordForm = ({ handleChangePassword }: SecurityPasswordFormPropsType): JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<SecurityPasswordType>({
    resolver: zodResolver(SecurityPasswordSchema),
    values: {
      current_password: '',
      password: '',
      confirmPassword: ''
    }
  });

  const { isMobile } = useDevice();

  const handleSubmitForm = (value: SecurityPasswordType) => {
    console.log('Change password form value: ', value);
    handleChangePassword(value);
  };

  const handleToggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Stack>
      <form className='py-4' onSubmit={handleSubmit(handleSubmitForm)}>
        <Typography variant='h6' className='pb-3'>
          Change Password
        </Typography>
        <Stack spacing={3}>
          <Controller
            control={control}
            name='current_password'
            render={({ field: { onChange, value } }) => (
              <InputField
                backgroundColor='transparent'
                className={`${isMobile ? 'w-5/6' : 'w-3/6'}`}
                variant='outlined'
                placeholder='Current password'
                type={'password'}
                value={value}
                onChange={onChange}
                error={errors.current_password}
              />
            )}
          />
          <Controller
            control={control}
            name='password'
            render={({ field: { onChange, value } }) => (
              <InputField
                backgroundColor='transparent'
                className={`${isMobile ? 'w-5/6' : 'w-3/6'}`}
                variant='outlined'
                placeholder='New password'
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                error={errors.password}
                endAdornment={
                  <IconButton onPointerUp={handleToggleShowPassword} onPointerDown={handleToggleShowPassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                }
              />
            )}
          />
          <Controller
            control={control}
            name='confirmPassword'
            render={({ field: { onChange, value } }) => (
              <InputField
                backgroundColor='transparent'
                className={`${isMobile ? 'w-5/6' : 'w-3/6'}`}
                variant='outlined'
                placeholder='Confirm password'
                type='password'
                value={value}
                onChange={onChange}
                error={errors.confirmPassword}
              />
            )}
          />
        </Stack>
        <ButtonForm type='submit' variant='contained' className='mt-4'>
          Save Change
        </ButtonForm>
      </form>
      <Stack spacing={2}>
        <Typography variant='subtitle1' className='font-medium'>
          Your password
        </Typography>
        <Stack spacing={2} className='text-sm text-slate-500'>
          <p>Must be 7 characters or more</p>
          <p>There should be at least 1 number and 1 special character</p>
          <p>There should be at least 1 lowercase and 1 uppercase character</p>
          <p>Should not be similar to recently used passwords</p>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SecurityPasswordForm;
