import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { Map } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';

import ButtonForm from '@app/components/atoms/button';
import CustomComboBox from '@app/components/atoms/comboBox';
import InputField from '@app/components/atoms/inputField';
import { useDevice } from '@app/hooks/useDevice';
import { RootState } from '@app/store';

import { PersonalInfoSchema, PersonalInfoType } from './schemas';

type PersonalInfoPropsType = {
  handleUpdateProfile: (formValue: PersonalInfoType) => void;
};

const PersonalInfo = ({ handleUpdateProfile }: PersonalInfoPropsType): JSX.Element => {
  const user = useSelector((state: RootState) => state.auth.user);
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<PersonalInfoType>({
    resolver: zodResolver(PersonalInfoSchema),
    defaultValues: {
      fullName: user?.fullName,
      gender: user?.gender,
      passport: user?.passport,
      phone: user?.phone
    }
  });
  const { isMobile } = useDevice();

  const handleSubmitForm = (value: PersonalInfoType) => {
    console.log('Personal Info', value);
    handleUpdateProfile(value);
  };
  return (
    <Stack spacing={4}>
      <Typography variant='h5'>Personal</Typography>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Stack className={`${isMobile ? 'w-[80%]' : 'w-[50%]'}`} spacing={4}>
          <Controller
            control={control}
            name='fullName'
            render={({ field: { value, onChange } }) => (
              <InputField
                variant='outlined'
                backgroundColor='transparent'
                label='Fullname'
                value={value}
                onChange={onChange}
                error={errors.fullName}
              />
            )}
          />
          <Controller
            control={control}
            name='phone'
            render={({ field: { value, onChange } }) => (
              <InputField
                variant='outlined'
                backgroundColor='transparent'
                label='Phone'
                value={value}
                onChange={onChange}
                error={errors.phone}
              />
            )}
          />
          <InputField variant='outlined' backgroundColor='transparent' label='Email' value={user?.email} disabled />

          <Controller
            control={control}
            name='passport'
            render={({ field: { value, onChange } }) => (
              <InputField
                variant='outlined'
                backgroundColor='transparent'
                label='Passport/ID'
                value={value}
                onChange={onChange}
                error={errors.passport}
              />
            )}
          />
          <Controller
            control={control}
            name='gender'
            render={({ field: { value, onChange } }) => (
              <CustomComboBox
                value={value}
                label='Gender'
                data={[
                  { name: 'Male', value: 'Male', label: 'Male' },
                  { name: 'Female', value: 'Female', label: 'Female' }
                ]}
                onChange={onChange}
                error={errors.gender}
              />
            )}
          />
          <Stack
            direction={'row'}
            spacing={4}
            className='text-sm text-blue-700 cursor-pointer'
            alignItems={'center'}
            justifyContent={'flex-end'}>
            <Map />
            <Link to={'/user/address'} className='my-0 ml-2 no-underline'>
              Manage delivery address
            </Link>
          </Stack>
          <ButtonForm className='w-28' variant='contained' type='submit'>
            Save change
          </ButtonForm>
        </Stack>
      </form>
    </Stack>
  );
};

export default PersonalInfo;
