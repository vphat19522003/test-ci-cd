import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { Visibility } from '@mui/icons-material';
import { CircularProgress, Stack } from '@mui/material';

import { useUpdateUserAvater } from '@app/api/hooks/user.hook';
// import stitchAvatar from '@app/assets/stitch_icon.png';
import viteAvatar from '@app/assets/vite.svg';
import { IDialogRef } from '@app/components/organisms/confirmPopup';
import PopUp from '@app/components/organisms/popup';
import { imageFileTypes, MAX_FILE_SIZE } from '@app/constants/file';
import { setUser } from '@app/redux/authSlice';
import { RootState } from '@app/store';
import { IErrorResponse } from '@app/types/common';

// const uploadAvatarSchema = zod.object({
//   file: zod
//     .any()
//     .refine((file) => file.length === 1, { message: 'Can only upload 1 file at a time' })
//     .refine((file) => file[0].size <= 5 * 1024 * 1024, {
//       message: 'Can only upload file has size less than 5MB'
//     })
// });

const AvatarInfo = (): JSX.Element => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const avatarPopupRef = useRef<IDialogRef>(null);

  const { mutate: uploadAvatar, isPending } = useUpdateUserAvater();

  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const handleMouseEnterAvatar = () => {
    setIsHovering(true);
  };

  const handleMouseLeaveAvatar = () => {
    setIsHovering(false);
  };

  const handleOpenAvatar = () => {
    avatarPopupRef.current?.show();
  };

  const handleUploadFile = (fileList: FileList) => {
    if (fileList.length < 0) return toast.error('Please choose 1 file to upload');

    if (fileList.length > 1) return toast.error('Only one file can be uploaded');

    if (fileList[0].size > MAX_FILE_SIZE) return toast.error('Can only upload file has size less than 5MB');

    if (!imageFileTypes.includes(fileList[0].type))
      return toast.error("Can only upload file: image/jpeg', 'image/jpg', 'image/png', 'image/gif'");

    uploadAvatar(fileList[0], {
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
    <>
      <Stack
        direction={'row'}
        spacing={8}
        className='border-solid border-y-[0.5px] border-gray-200 border-x-0 py-4'
        alignItems={'center'}>
        <Stack
          className='w-[140px] h-[140px] rounded-full relative shadow-md overflow-hidden cursor-pointer'
          onMouseEnter={handleMouseEnterAvatar}
          onMouseLeave={handleMouseLeaveAvatar}
          onClick={() => handleOpenAvatar()}>
          <img
            src={user?.avatar ? user.avatar.avatar_url : viteAvatar}
            alt=''
            className='w-[140px] h-[140px] rounded-full border-solid border-gray-200 object-cover border-2 '
          />

          <div
            className={` w-[140px] h-[140px] rounded-full bg-black absolute transition-all duration-300 ease-in-out top-0 left-0 ${isHovering ? 'opacity-15 visible' : 'opacity-0 invisible'}`}></div>

          <Visibility
            className={` z-10 absolute text-white transition-opacity duration-300 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
          />
        </Stack>
        <Stack>
          <input
            type='file'
            onChange={(e) => handleUploadFile(e.target.files as FileList)}
            multiple={false}
            accept='.jpg,.jpeg,.png,.gif'
            disabled={isPending}
          />
          <p className='text-gray-500 text-md'>Please choose image has size less than 5MB</p>
          {isPending && <CircularProgress />}
        </Stack>
      </Stack>
      <PopUp title='Avatar' ref={avatarPopupRef} setClose>
        <Stack>
          <img src={user?.avatar ? user.avatar.avatar_url : viteAvatar} alt='' className='object-cover w-full h-full' />
        </Stack>
      </PopUp>
    </>
  );
};

export default AvatarInfo;
