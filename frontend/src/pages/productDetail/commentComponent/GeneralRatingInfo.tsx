import { Divider, Rating, Stack, Typography } from '@mui/material';

import BorderLinearProgress from '@app/components/organisms/borderLinearProgress';
import { useDevice } from '@app/hooks/useDevice';

type GeneralRatingInfoProps = {
  ratingSummary: { star: number; count: number }[];
  totalComments: number;
};

const GeneralRatingInfo = ({ ratingSummary, totalComments }: GeneralRatingInfoProps): JSX.Element => {
  const { isMobile } = useDevice();
  const productVoteRate = Math.ceil(
    ratingSummary.reduce((acc, item) => acc + item.count * item.star, 0) / totalComments
  );
  return (
    <Stack direction={isMobile ? 'column' : 'row'}>
      <Stack className={`min-h-64 ${isMobile ? 'w-full' : 'w-4/12'}`}>
        <Typography className='font-semibold text-md'>Tổng quan</Typography>
        {/* Rating Point */}
        <Stack direction={'row'} alignItems={'center'} spacing={4} className='mt-2'>
          <Typography className='text-4xl font-bold'>{productVoteRate || 0}.0</Typography>
          <Rating name='rating' value={productVoteRate || 0} precision={1} size='large' readOnly />
        </Stack>
        {/* Total comment */}
        <Typography className='text-md text-gray-400'>({totalComments} ratings)</Typography>
        {/* Total rating type */}
        <Stack spacing={2} className='mt-3'>
          {/* 5 stars */}
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <Rating name='rating' defaultValue={5} precision={1} size='small' readOnly />
            <BorderLinearProgress
              variant='determinate'
              value={ratingSummary.find((item) => item.star === 5)?.count || 0}
              className='w-[140px]'
            />
            <Typography className='text-xs text-gray-500'>
              {ratingSummary.find((item) => item.star === 5)?.count || 0}
            </Typography>
          </Stack>
          {/* 4 stars */}
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <Rating name='rating' defaultValue={4} precision={1} size='small' readOnly />
            <BorderLinearProgress
              variant='determinate'
              value={ratingSummary.find((item) => item.star === 4)?.count || 0}
              className='w-[140px]'
            />
            <Typography className='text-xs text-gray-500'>
              {ratingSummary.find((item) => item.star === 4)?.count || 0}
            </Typography>
          </Stack>
          {/* 3 stars */}
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <Rating name='rating' defaultValue={3} precision={1} size='small' readOnly />
            <BorderLinearProgress
              variant='determinate'
              value={ratingSummary.find((item) => item.star === 3)?.count || 0}
              className='w-[140px]'
            />
            <Typography className='text-xs text-gray-500'>
              {ratingSummary.find((item) => item.star === 3)?.count || 0}
            </Typography>
          </Stack>
          {/* 2 stars */}
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <Rating name='rating' defaultValue={2} precision={1} size='small' readOnly />
            <BorderLinearProgress
              variant='determinate'
              value={ratingSummary.find((item) => item.star === 2)?.count || 0}
              className='w-[140px]'
            />
            <Typography className='text-xs text-gray-500'>
              {ratingSummary.find((item) => item.star === 2)?.count || 0}
            </Typography>
          </Stack>
          {/* 1 stars */}
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <Rating name='rating' defaultValue={1} precision={1} size='small' readOnly />
            <BorderLinearProgress
              variant='determinate'
              value={ratingSummary.find((item) => item.star === 1)?.count || 0}
              className='w-[140px]'
            />
            <Typography className='text-xs text-gray-500'>
              {ratingSummary.find((item) => item.star === 1)?.count || 0}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Divider orientation={isMobile ? 'horizontal' : 'vertical'} variant='middle' flexItem />
      <Stack className={`min-h-64 ${isMobile ? 'w-full' : 'w-8/12'}`}></Stack>
    </Stack>
  );
};

export default GeneralRatingInfo;
