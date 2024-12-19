import { Check, Clear } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';

import { passwordMinLength } from '@app/constants/regex';

type PasswordStrengthMeterProps = {
  password: string;
};

const PasswordCriteria = ({ password }: PasswordStrengthMeterProps): JSX.Element => {
  const criteria1 = [
    { label: 'At least 7 characters', met: password.length >= passwordMinLength },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Contains lowercase letter', met: /[a-z]/.test(password) }
  ];

  const criteria2 = [
    { label: 'Contains a number', met: /\d/.test(password) },
    { label: 'Contains special character', met: /[^A-Za-z0-9]/.test(password) }
  ];

  return (
    <Stack className='mt-2 space-y-1' direction={'row'} justifyContent={'space-between'}>
      <Box>
        {criteria1.map((item) => (
          <Stack key={item.label} className='text-xs' direction={'row'} alignItems={'center'}>
            {item.met ? (
              <Check className='mr-2 text-green-500 size-4' />
            ) : (
              <Clear className='mr-2 text-gray-500 size-4' />
            )}
            <span className={item.met ? 'text-blue-500' : 'text-gray-400'}>{item.label}</span>
          </Stack>
        ))}
      </Box>
      <Box>
        {criteria2.map((item) => (
          <Stack key={item.label} className='text-xs' direction={'row'} alignItems={'center'}>
            {item.met ? (
              <Check className='mr-2 text-green-500 size-4' />
            ) : (
              <Clear className='mr-2 text-gray-500 size-4' />
            )}
            <span className={item.met ? 'text-blue-500' : 'text-gray-400'}>{item.label}</span>
          </Stack>
        ))}
      </Box>
    </Stack>
  );
};

const PasswordStrengthMeter = ({ password }: PasswordStrengthMeterProps): JSX.Element => {
  const getStrength = (pass: string) => {
    let strength = 0;
    if (pass.length >= passwordMinLength) strength++;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
    if (pass.match(/\d/)) strength++;
    if (pass.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  };

  const strength = getStrength(password);

  const getColor = (strength: number) => {
    if (strength === 0) return 'bg-red-500';
    if (strength === 1) return 'bg-red-400';
    if (strength === 2) return 'bg-yellow-500';
    if (strength === 3) return 'bg-yellow-400';
    return 'bg-green-500';
  };

  const getStrengthText = (strength: number) => {
    if (strength === 0) return 'Very Weak';
    if (strength === 1) return 'Weak';
    if (strength === 2) return 'Fair';
    if (strength === 3) return 'Good';
    return 'Strong';
  };

  return (
    <Stack className='mt-2'>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography className='text-sm text-gray-400'>Password strength</Typography>
        <Typography className='text-sm text-gray-400'>{getStrengthText(strength)}</Typography>
      </Stack>
      <Stack className='space-x-1' direction='row'>
        {Array.from({ length: 4 }, (_, index) => (
          <Stack
            key={index}
            className={`h-1 w-1/4 rounded-full transition-colors duration-300 ${index < strength ? getColor(strength) : 'bg-gray-400'}`}
          />
        ))}
      </Stack>
      <PasswordCriteria password={password} />
    </Stack>
  );
};

export default PasswordStrengthMeter;
