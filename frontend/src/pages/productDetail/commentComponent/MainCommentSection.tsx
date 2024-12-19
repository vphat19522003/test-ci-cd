import { useDispatch, useSelector } from 'react-redux';

import { CheckCircle, Comment, Share, ThumbUp, ThumbUpOffAlt } from '@mui/icons-material';
import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  Pagination,
  Rating,
  Stack,
  Typography
} from '@mui/material';

import ButtonForm from '@app/components/atoms/button';
import { useDevice } from '@app/hooks/useDevice';
import { showImageViewer } from '@app/redux/uiSlice';
import { RootState } from '@app/store';

import { commentRatelabels } from './CommentForm';
import { IComment } from './schemas';

type MainCommentSectionProps = {
  listComment: IComment[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
  handleChangePage: (event: React.ChangeEvent<unknown>, page: number) => void;
  isPendingGetComment: boolean;
};
const MainCommentSection = ({
  listComment,
  pagination,
  handleChangePage,
  isPendingGetComment
}: MainCommentSectionProps): JSX.Element => {
  const { isMobile } = useDevice();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  if (listComment.length === 0) {
    return (
      <Box>
        <Typography className='text-lg text-slate-600 text-center mt-2'>Chưa có bình luận</Typography>
      </Box>
    );
  }

  return (
    <>
      {isPendingGetComment ? (
        <CircularProgress className='mx-auto' />
      ) : (
        listComment?.map((item, index) => (
          <Stack key={index}>
            <Stack direction={'row'} spacing={4} className='py-2 '>
              {/* User Info */}
              <Stack className={`${isMobile ? 'w-5/12' : 'w-3/12'}`}>
                {/* User Avatar, name, participate date */}
                <Stack direction={'row'} spacing={3}>
                  <Avatar alt='Remy Sharp' src={item.userId.avatar?.avatar_url || ''} />
                  {/* Name, participate date */}
                  <Stack>
                    <Typography
                      className={`text-lg font-semibold ${user && user._id === item.userId._id ? 'text-pink-500' : ''}`}>
                      {item.userId?.username}
                    </Typography>
                    <Typography className='text-sm font-medium text-gray-400'>
                      Participate {item.userId?.createdAt}
                    </Typography>
                  </Stack>
                </Stack>
                {/* All comments */}
                <Stack direction={'row'} justifyContent={'space-between'} className='my-2'>
                  <Stack direction={'row'} spacing={1} alignItems={'center'}>
                    <Comment className='text-sm text-gray-400' />
                    <Typography className='text-sm text-gray-400'>Đã viết</Typography>
                  </Stack>
                  <Stack direction={'row'} spacing={2}>
                    <Typography className='text-sm'>2 Đánh giá</Typography>
                  </Stack>
                </Stack>
                <Divider />
                {/* All likes */}
                <Stack direction={'row'} justifyContent={'space-between'} className='my-2'>
                  <Stack direction={'row'} spacing={1} alignItems={'center'}>
                    <ThumbUp className='text-sm text-gray-400' />
                    <Typography className='text-sm text-gray-400'>Đã nhận</Typography>
                  </Stack>
                  <Stack direction={'row'} spacing={2}>
                    <Typography className='text-sm'>5 Lượt cảm ơn</Typography>
                  </Stack>
                </Stack>
              </Stack>
              {/* Comment Section */}
              <Stack className={`${isMobile ? 'w-7/12' : 'w-9/12'}`}>
                {/* Rating point */}
                <Stack direction={'row'} spacing={2} alignItems={'center'}>
                  <Rating name='rating' value={item.comment_vote} precision={1} size='small' readOnly />
                  <Typography className='text-lg font-bold'>{commentRatelabels[item.comment_vote]}</Typography>
                </Stack>
                {/* Has bought */}
                <Stack direction={'row'} spacing={2} alignItems={'center'} className='mt-1'>
                  <CheckCircle className='text-md text-green-600' />
                  <Typography className='text-sm font-md text-green-600'>Đã mua hàng</Typography>
                </Stack>

                {/* Comment content, image */}
                <Stack className='mt-4'>
                  <Typography className='text-md text-justify'>{item.content}</Typography>
                  <Stack direction={'row'} spacing={4}>
                    {item.comment_images &&
                      item.comment_images?.length > 0 &&
                      item.comment_images?.map((commentImg, index) => (
                        <Box
                          key={index}
                          className={
                            'cursor-pointer size-16 border-[0.2px] border-solid border-slate-200 rounded-lg overflow-hidden mt-2'
                          }
                          onClick={() => {
                            dispatch(
                              showImageViewer({
                                index: item.comment_images.findIndex((item) => item.url === commentImg.url),
                                images: item.comment_images.map((item) => item.url)
                              })
                            );
                          }}>
                          <img src={commentImg.url} alt={'comment image'} className='w-full h-full object-cover' />
                        </Box>
                      ))}
                  </Stack>

                  {/* Time comment */}
                  <Typography className='text-md text-gray-400 mt-2'>Đánh giá vào {item.comment_date}</Typography>
                </Stack>

                {/* Comment action */}
                {(!user || user?._id !== item.userId._id) && (
                  <Stack direction={'row'} justifyContent={'space-between'} className='mt-2'>
                    <ButtonForm className='size-auto'>
                      <ThumbUpOffAlt className='text-lg' />
                      <Typography className='ml-2 text-md'>Hữu ích</Typography>
                    </ButtonForm>
                    <IconButton className='size-auto'>
                      <Share className='text-xl text-blue-700' />
                    </IconButton>
                  </Stack>
                )}
              </Stack>
            </Stack>
            <Divider />
          </Stack>
        ))
      )}
      <Stack direction={'row'} justifyContent={'flex-end'}>
        <Pagination
          count={Math.ceil(pagination.total / pagination.pageSize)}
          onChange={handleChangePage}
          color='primary'
        />
      </Stack>
    </>
  );
};

export default MainCommentSection;
