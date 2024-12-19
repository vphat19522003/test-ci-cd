import { useCallback, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, Box, IconButton, Link, Snackbar, Stack, Typography } from '@mui/material';

import ButtonForm from '@app/components/atoms/button';
import InputField from '@app/components/atoms/inputField';
import Label from '@app/components/atoms/label';
import PasswordStrengthMeter from '@app/components/molecules/PasswordStrengthMeter';
import { paths } from '@app/routes/paths';

import { UserInfoPropsType, UserInfoValidSchema, type UserInfoValidType } from './schema';

const UserInformation = ({ handleSubmitInformation }: UserInfoPropsType): JSX.Element => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<UserInfoValidType>({
    resolver: zodResolver(UserInfoValidSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const password = useWatch({
    control,
    name: 'password' // Field to watch
  });

  const handleToggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleKeyDown = useCallback((event) => {
    if (event.getModifierState('CapsLock')) {
      setOpenSnackbar(true);
    }
  }, []);

  const handleKeyUp = useCallback((event) => {
    if (!event.getModifierState('CapsLock')) {
      setOpenSnackbar(false);
    }
  }, []);

  const handleToggleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const submitForm = (userInfo: UserInfoValidType) => {
    handleSubmitInformation(userInfo);
  };
  return (
    <>
      <Link
        className='inline-flex self-start mt-5 ml-2 text-pink-500 no-underline cursor-pointer hover:underline'
        href={paths.login}>
        {'< Login'}
      </Link>
      <Stack justifyContent='center' alignItems='center' className='px-2' direction={'column'}>
        <Typography variant='h4' component='h4' className='pt-1 pb-1 font-bold text-center text-blue-600 '>
          Sign Up
        </Typography>

        <form className='w-full' onSubmit={handleSubmit(submitForm)}>
          <Stack className='h-full'>
            <Box className='grid gap-4 mt-2'>
              <Stack direction='column' className='gap-2'>
                <Label title='Username' required />
                <Controller
                  name='username'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <InputField autoFocus error={errors.username} type='text' onChange={onChange} value={value} />
                  )}
                />
              </Stack>
              <Stack direction='column' className='gap-2'>
                <Label title='Email' required />
                <Controller
                  name='email'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <InputField error={errors.email} type='email' onChange={onChange} value={value} />
                  )}
                />
              </Stack>
              {/* <Stack direction={'row'} alignItems={'center'}>
                <Stack direction='column' className={'mr-2 w-1/2'}>
                  <Label title='FullName' required />
                  <Controller
                    name='fullName'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <InputField error={errors.fullName} type='text' onChange={onChange} value={value} />
                    )}
                  />
                </Stack>
                <Stack direction='column' className={'w-1/2'}>
                  <Label title='Phone Number' required />
                  <Controller
                    name='phone'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <InputField error={errors.phone} type='text' onChange={onChange} value={value} />
                    )}
                  />
                </Stack>
              </Stack> */}
              <Box>
                <Stack direction='column' className='gap-2'>
                  <Label title='Password' required />
                  <Controller
                    name='password'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        error={errors.password}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <IconButton onPointerUp={handleToggleShowPassword} onPointerDown={handleToggleShowPassword}>
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        }
                        onKeyDown={handleKeyDown}
                        onKeyUp={handleKeyUp}
                        onChange={onChange}
                        value={value}
                      />
                    )}
                  />
                </Stack>
                <PasswordStrengthMeter password={password} />
                <Stack direction='column' className='gap-2 mt-2'>
                  <Label title='Confirm Password' required />
                  <Controller
                    name='confirmPassword'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        error={errors.confirmPassword}
                        type={showConfirmPassword ? 'text' : 'password'}
                        endAdornment={
                          <IconButton
                            onPointerUp={handleToggleShowConfirmPassword}
                            onPointerDown={handleToggleShowConfirmPassword}>
                            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        }
                        onKeyDown={handleKeyDown}
                        onKeyUp={handleKeyUp}
                        onChange={onChange}
                        value={value}
                      />
                    )}
                  />
                </Stack>
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                  <Alert onClose={() => setOpenSnackbar(false)} severity='warning'>
                    Caps Lock is on!
                  </Alert>
                </Snackbar>
              </Box>
            </Box>
            <Box className='pt-4'>
              <ButtonForm variant='contained' fullWidth type='submit'>
                Regist
              </ButtonForm>
            </Box>
          </Stack>
        </form>
      </Stack>
    </>
  );
};

export default UserInformation;
