import { useDispatch } from 'react-redux';

import { Box, Stack, Typography } from '@mui/material';

import { showImageViewer } from '@app/redux/uiSlice';

type CommentImageSectionProps = {
  commentImages?: string[];
};

const MAX_DISPLAY_COUNT = 6;
const CommentImageSection = ({ commentImages }: CommentImageSectionProps): JSX.Element => {
  const dispatch = useDispatch();

  if (!commentImages || commentImages.length === 0) {
    return (
      <Stack className='min-h-12'>
        <Typography className='font-semibold text-md'>All Images</Typography>
        <Stack>
          <Typography className='text-md mt-2 text-slate-600'>No review images</Typography>
        </Stack>
      </Stack>
    );
  }

  const tempImages =
    commentImages.length <= MAX_DISPLAY_COUNT ? commentImages : commentImages?.slice(0, MAX_DISPLAY_COUNT);

  const handleImageClick = (index: number) => {
    dispatch(
      showImageViewer({
        index,
        images: commentImages
      })
    );
  };
  return (
    <Stack className='min-h-12'>
      <Typography className='font-semibold text-md'>All Images ({commentImages?.length})</Typography>
      <Stack direction={'row'} spacing={2}>
        {commentImages.length <= MAX_DISPLAY_COUNT ? (
          tempImages?.map((image, index) => (
            <Box
              key={index}
              className={
                'cursor-pointer size-16 border-[0.2px] border-solid border-slate-200 rounded-lg overflow-hidden mt-2'
              }
              onClick={() => handleImageClick(tempImages.findIndex((item) => item === image))}>
              <img src={image} alt={'comment image'} className='w-full h-full object-cover' />
            </Box>
          ))
        ) : (
          <>
            {tempImages?.map((image, index) => (
              <Box
                key={index}
                className={
                  'cursor-pointer size-16 border-[0.2px] border-solid border-slate-200 rounded-lg overflow-hidden mt-2'
                }>
                <img
                  src={image}
                  alt={'comment image'}
                  className='w-full h-full object-cover'
                  onClick={() => handleImageClick(tempImages.findIndex((item) => item === image))}
                />
              </Box>
            ))}
            <Box
              key={tempImages?.length}
              className={
                'relative cursor-pointer size-16 border-[0.2px] border-solid border-slate-200 rounded-lg  overflow-hidden mt-2'
              }
              onClick={() => handleImageClick(6)}>
              <Box className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-30'>
                <Typography className='text-white text-3xl'>
                  +{commentImages?.length - MAX_DISPLAY_COUNT - 1}
                </Typography>
              </Box>
              <img
                src={commentImages[MAX_DISPLAY_COUNT]}
                alt={'comment image'}
                className='w-full h-full object-cover'
              />
            </Box>
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default CommentImageSection;
