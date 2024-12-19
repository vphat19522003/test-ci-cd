import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, Box, Checkbox, FormControlLabel, IconButton, Link, Snackbar, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';

import { useLogin } from '@app/api/hooks/auth.hook';
import ButtonForm from '@app/components/atoms/button';
import InputField from '@app/components/atoms/inputField';
import Label from '@app/components/atoms/label';
import ImageSlider from '@app/components/molecules/ImageSlider';
import { setUser } from '@app/redux/authSlice';
import { paths } from '@app/routes/paths';
import { RootState } from '@app/store';
import { IErrorResponse } from '@app/types/common';

//import StitchLogo from '../../assets/stitch_icon.png';
import viteLogo from '../../assets/vite.svg';
import { LoginSchema, LoginSchemaType } from './schemas';

const LoginPage = (): JSX.Element => {
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors, isLoading }
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const navigate = useNavigate();

  const { mutate: loginMutate, isPending } = useLogin();

  //redux
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

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

  const handleToggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const submitForm = (value: LoginSchemaType) => {
    loginMutate(value, {
      onSuccess: (data) => {
        dispatch(setUser({ user: data.result }));
        if (rememberMe) localStorage.setItem('username', data.result.username);
        else localStorage.removeItem('username');
        toast.success(data.message);
        if (data.result.role === 'User') navigate(paths.index);
        else if (data.result.role === 'Admin') navigate(paths.admin.dashboard);
      },
      onError: (err: IErrorResponse) => {
        toast.error(err.response.data.message as string);
      }
    });
  };

  useEffect(() => {
    const userNameCache = localStorage.getItem('username');
    if (userNameCache) {
      setRememberMe(true);
      setValue('username', userNameCache);
    }
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='w-full h-full md:w-[980px] md:h-[540px] overflow-y-auto bg-white shadow-md backdrop-filter backdrop-blur-xl md:rounded-2xl shadow-black-100'>
      <Box className='grid w-full h-full grid-cols-1 md:grid-cols-2'>
        <Box className='z-0 hidden h-full md:flex md:items-center md:justify-center bg-gradient-to-br from-blue-500 to-pink-300 opacity-90 rounded-es-2xl rounded-ss-2xl'>
          <ImageSlider />
        </Box>
        <Stack justifyContent='center' alignItems='center' className='h-full px-8'>
          <form className='w-full' onSubmit={handleSubmit(submitForm)}>
            <Stack flexDirection='column' className='h-full'>
              <Stack justifyContent='center' alignItems='center' className='mb-10'>
                <Box
                  className='flex md:hidden'
                  sx={{
                    width: {
                      xs: '80px'
                    },
                    height: {
                      xs: '80px'
                    }
                  }}></Box>
                <img src={viteLogo} className='z-10 block w-20 h-20 md:hidden' alt='Login banner' />
                <Stack flexDirection={'row'} gap={1}>
                  <Typography
                    variant='h1'
                    component='h1'
                    className='font-bold tracking-wider text-center text-blue-700 md:m-auto'
                    sx={(theme) => ({
                      [theme.breakpoints.down(400)]: {
                        fontSize: '40px'
                      },
                      fontSize: {
                        xs: '48px',
                        md: '64px'
                      }
                    })}>
                    Vite
                  </Typography>
                  <img src={viteLogo} alt='Logo' className='hidden object-cover w-20 h-20 md:block' />
                  <Typography
                    variant='h1'
                    component='h1'
                    className='font-bold tracking-wider text-center text-pink-500 md:m-auto'
                    sx={(theme) => ({
                      [theme.breakpoints.down(400)]: {
                        fontSize: '40px'
                      },
                      fontSize: {
                        xs: '48px',
                        md: '64px'
                      }
                    })}>
                    Shop
                  </Typography>
                </Stack>
              </Stack>

              <Box className='grid gap-4'>
                <Stack direction='column' className='gap-2'>
                  <Label title='Username' required />
                  <Controller
                    name='username'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        autoFocus
                        error={errors.username}
                        type='text'
                        onChange={onChange}
                        value={value}
                        placeholder='Username'
                      />
                    )}
                  />
                </Stack>
                <Stack direction='column' className='gap-2'>
                  <Label title='Password' required />
                  <Controller
                    name='password'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <>
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
                          placeholder='Password'
                        />
                        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                          <Alert onClose={() => setOpenSnackbar(false)} severity='warning'>
                            Caps Lock is on!
                          </Alert>
                        </Snackbar>
                      </>
                    )}
                  />
                </Stack>
              </Box>
              <FormControlLabel
                control={
                  <Checkbox
                    color='primary'
                    checked={rememberMe}
                    onChange={() => setRememberMe((prev) => !prev)}
                    name='Remember me'
                    style={{
                      transform: 'scale(0.8)'
                    }}
                  />
                }
                label='Remember me'
                sx={() => ({
                  '.MuiFormControlLabel-label': {
                    fontSize: '14px'
                  }
                })}
              />
              <Stack marginTop={4} justifyContent='center' alignItems='flex-start'>
                <Link href={paths.forgotPassword} className='text-sm no-underline'>
                  Forgot Password?
                </Link>
              </Stack>

              <ButtonForm loading={isLoading} variant='contained' fullWidth className='mt-4 text-lg' type='submit'>
                Login
              </ButtonForm>

              <hr className='w-full my-4 opacity-20' />
              <Stack flexDirection={'row'} alignItems={'center'}>
                <Typography component='span' className='text-sm'>
                  Don't have an account?&nbsp;
                </Typography>
                <Typography component='span' className='text-sm'>
                  <Link href={paths.signUp} className='text-sm text-pink-400 no-underline '>
                    Join us now!
                  </Link>
                </Typography>
              </Stack>
            </Stack>
          </form>
        </Stack>
      </Box>
    </motion.div>
  );
};

export default LoginPage;
