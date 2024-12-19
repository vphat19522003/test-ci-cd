import { useDispatch } from 'react-redux';

import { CheckCircle, Delete, Notes } from '@mui/icons-material';
import { Avatar, Box, IconButton, Rating, Stack, Tooltip, Typography } from '@mui/material';

import { useDevice } from '@app/hooks/useDevice';
import { showImageViewer } from '@app/redux/uiSlice';

import { commentRatelabels } from './CommentForm';
import { IComment } from './schemas';

type MyCommentProps = {
  myComment: IComment;
  handleDeleteComment: () => void;
};
const MyComment = ({ myComment, handleDeleteComment }: MyCommentProps): JSX.Element => {
  const { isMobile } = useDevice();
  const dispatch = useDispatch();
  return (
    <Stack>
      <Stack direction={'row'} alignItems={'center'} spacing={2} className='mb-2 bg-blue-700 px-2 py-1'>
        <Notes className='text-white' />
        <Typography className='font-semibold text-lg bg-blue-700 text-white '>Your comment</Typography>
      </Stack>

      <Stack direction={'row'} spacing={4} className='py-2 '>
        {/* User Info */}
        <Stack className={`${isMobile ? 'w-5/12' : 'w-3/12'}`}>
          {/* User Avatar, name, participate date */}
          <Stack direction={'row'} spacing={3}>
            <Avatar alt='Remy Sharp' src={myComment.userId.avatar?.avatar_url || ''} />
            {/* Name, participate date */}
            <Stack>
              <Typography className='text-lg font-semibold text-pink-500'>{myComment.userId.username}</Typography>
            </Stack>
          </Stack>
          {/* All comments */}
        </Stack>
        {/* Comment Section */}
        <Stack className={`${isMobile ? 'w-7/12' : 'w-9/12'}`}>
          {/* Rating point */}
          <Stack direction={'row'} spacing={2} alignItems={'center'}>
            <Rating name='rating' value={myComment.comment_vote} precision={1} size='small' readOnly />
            <Typography className='text-lg font-bold'>{commentRatelabels[myComment.comment_vote]}</Typography>
          </Stack>

          <Stack direction={'row'} spacing={2} alignItems={'center'} className='mt-1'>
            <CheckCircle className='text-md text-green-600' />
            <Typography className='text-sm font-md text-green-600'>Đã mua hàng</Typography>
          </Stack>

          {/* Comment content, image */}
          <Stack className='mt-4'>
            <Typography className='text-md text-justify'>{myComment.content}</Typography>
            <Stack direction={'row'} spacing={4}>
              {myComment.comment_images &&
                myComment.comment_images?.length > 0 &&
                myComment.comment_images?.map((commentImg, index) => (
                  <Box
                    key={index}
                    className={
                      'cursor-pointer size-16 border-[0.2px] border-solid border-slate-200 rounded-lg overflow-hidden mt-2'
                    }
                    onClick={() => {
                      dispatch(
                        showImageViewer({
                          index: myComment.comment_images.findIndex((item) => item.url === commentImg.url),
                          images: myComment.comment_images.map((item) => item.url)
                        })
                      );
                    }}>
                    <img src={commentImg.url} alt={'comment image'} className='w-full h-full object-cover' />
                  </Box>
                ))}
            </Stack>

            {/* Time comment */}
            <Typography className='text-md text-gray-400 mt-2'>Đánh giá vào {myComment.comment_date}</Typography>
          </Stack>

          {/* Comment action */}
          <Stack direction={'row'} justifyContent={'flex-end'} className='mt-2'>
            <Tooltip title='Delete comment'>
              <IconButton className='size-auto' onClick={handleDeleteComment}>
                <Delete className='text-xl text-red-600' />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MyComment;
