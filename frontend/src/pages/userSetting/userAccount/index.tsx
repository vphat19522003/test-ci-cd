import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { Stack } from '@mui/material';

import { useUpdateUserProfile } from '@app/api/hooks/user.hook';
import { setUser } from '@app/redux/authSlice';
import { IErrorResponse } from '@app/types/common';

import AvatarInfo from './components/avatarInfo';
import GeneralInfo from './components/generalInfo';
import PersonalInfo from './components/personalInfo';
import { PersonalInfoType } from './components/schemas';

const UserAccount = (): JSX.Element => {
  const { mutate: updateProfileMutate } = useUpdateUserProfile();
  const dispatch = useDispatch();

  const handleUpdateProfile = (value: PersonalInfoType) => {
    updateProfileMutate(value, {
      onSuccess: (data) => {
        toast.success(data.message);
        dispatch(setUser({ user: data.result }));
      },
      onError: (err: IErrorResponse) => {
        toast.error(err.response.data.message);
      }
    });
  };

  return (
    <Stack spacing={8} className='p-5'>
      <Stack>
        <GeneralInfo />
      </Stack>
      <Stack>
        <AvatarInfo />
      </Stack>
      <Stack>
        <PersonalInfo handleUpdateProfile={handleUpdateProfile} />
      </Stack>
    </Stack>
  );
};

export default UserAccount;
