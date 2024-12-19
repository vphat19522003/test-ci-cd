import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, FormHelperText, Link, Stack, TextField, Typography } from '@mui/material';

import ButtonForm from '@app/components/atoms/button';
import { OTPCountDownSeconds } from '@app/constants/date';
import { digitRegex } from '@app/constants/regex';
import { paths } from '@app/routes/paths';

import { VerifyOTPSchemaType, VerifyOTPValidateSchema, VerifyOTPValidateType } from './schema';

const VerifyOTP = ({ userEmail, handleResendOTP, handleSubmitOTP }: VerifyOTPSchemaType): JSX.Element => {
  const {
    control,
    setValue,
    getValues,
    formState: { errors, isLoading },
    handleSubmit
  } = useForm<VerifyOTPValidateType>({
    resolver: zodResolver(VerifyOTPValidateSchema),
    defaultValues: { code: ' '.repeat(6), email: userEmail }
  });
  const [seconds, setSeconds] = useState<number>(OTPCountDownSeconds);
  const [isActive, setActive] = useState<boolean>(true);

  const inputRef = useRef<(HTMLInputElement | null)[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, onChange: (value: string) => void) => {
    e.preventDefault();
    console.log(inputRef);
    const pasteData = e.clipboardData.getData('text').slice(0, 6);
    if (!digitRegex.test(pasteData)) return;

    const newOTP = pasteData.padEnd(6, ' ').split('');
    newOTP.forEach((value, index) => {
      if (inputRef.current[index]) {
        inputRef.current[index].value = value;
        value !== ' ' && inputRef.current[index].focus();
      }
    });

    onChange(newOTP.join(''));
  };

  const handleOTPChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    onChange: (value: string) => void
  ) => {
    const value = e.target.value;

    if (!digitRegex.test(value) && value !== '') return;

    const currentOTP = getValues('code').split('');
    currentOTP[index] = value || ' ';

    onChange(currentOTP.join(''));

    if (value !== '' && index < 5) inputRef.current[index + 1]?.focus();
    else if (value === '' && index > 0) inputRef.current[index - 1]?.focus();
  };

  const handleOTPKeyDown = (e: React.KeyboardEvent, index) => {
    if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputRef.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      e.preventDefault();
      inputRef.current[index + 1]?.focus();
    }
  };

  const handleSubmitForm = (value: VerifyOTPValidateType) => {
    handleSubmitOTP(value);
  };

  const resetTimer = () => {
    setSeconds(OTPCountDownSeconds);
    setActive(true);
  };

  const handleClickResendOTP = () => {
    handleResendOTP(resetTimer);
  };

  useEffect(() => {
    if (isActive && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setActive(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, seconds]);
  return (
    <>
      <Link
        className='inline-flex self-start mt-6 ml-2 text-pink-500 no-underline cursor-pointer hover:underline'
        href={paths.login}>
        {'< Login '}
      </Link>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Stack direction='column' className='mt-4' alignItems='center' gap={3}>
          <Typography variant='h4' component='h4' className='font-bold text-center text-blue-600 '>
            OTP Verification
          </Typography>
          <Typography className='text-sm text-center text-blue-600'>
            An OTP has been sent to your email. <br />
            Please enter the OTP to verify your account
          </Typography>
          <Stack direction='column' alignItems={'center'} gap='8px'>
            <Controller
              control={control}
              name='code'
              render={({ field: { onChange, value } }) => (
                <Stack
                  onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => handlePaste(e, onChange)}
                  direction='row'
                  className='w-11/12 gap-4 mt-8 md:gap-6 md:w-150'
                  justifyContent='space-around'>
                  {Array.from({ length: 6 }, (_, index) => (
                    <TextField
                      inputRef={(el) => (inputRef.current[index] = el)}
                      key={index}
                      variant='standard'
                      type='tel'
                      autoComplete='off'
                      inputProps={{ maxLength: 1 }}
                      sx={{ input: { fontWeight: '500', fontSize: { xs: '40px', md: '64px' }, textAlign: 'center' } }}
                      onFocus={(e) => e.target.select()}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOTPChange(e, index, onChange)}
                      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleOTPKeyDown(e, index)}
                      value={getValues('code')[index] !== ' ' ? getValues('code')[index] : ''}
                    />
                  ))}
                </Stack>
              )}
            />

            <FormHelperText className='mt-4' error={!!errors.code}>
              {errors.code?.message}
            </FormHelperText>
            {!isActive && (
              <Typography component='span' className='text-sm text-center text-red-500'>
                Your OTP has expired. Please click resend OTP and try again
              </Typography>
            )}
          </Stack>
        </Stack>
        <Box className='mt-4 text-center'>
          <Typography component='span' className='text-4xl font-bold'>
            {`${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`}
          </Typography>
        </Box>
        <Stack alignItems='center' flexDirection='column' gap='8px' className='mt-4'>
          <ButtonForm
            type='submit'
            color='primary'
            variant='contained'
            className='h-12 w-80 md:w-120'
            disabled={!isActive}>
            Verify
          </ButtonForm>
          <ButtonForm
            variant='text'
            className='text-pink-500 disabled:text-gray-500'
            onClick={() => handleClickResendOTP()}
            disabled={isActive}>
            Resend OTP
          </ButtonForm>
        </Stack>
      </form>
    </>
  );
};

export default VerifyOTP;
