import { Stack, Typography } from '@mui/material';

import ButtonForm from '@app/components/atoms/button';

const listFilterButton = [
  {
    name: 'latest',
    label: 'Latest',
    value: 1,
    isChoose: false
  },
  {
    name: 'hasImage',
    label: 'Has Image',
    value: 2,
    isChoose: false
  },
  {
    name: 'hasBought',
    label: 'Has Bought',
    value: 3,
    isChoose: false
  },
  {
    name: 'rating',
    label: '5 stars',
    value: 5,
    isChoose: false
  },
  {
    name: 'rating',
    label: '4 stars',
    value: 4,
    isChoose: false
  },
  {
    name: 'rating',
    label: '3 stars',
    value: 3,
    isChoose: false
  },
  {
    name: 'rating',
    label: '2 stars',
    value: 2,
    isChoose: false
  },
  {
    name: 'rating',
    label: '1 star',
    value: 1,
    isChoose: false
  }
];

const CommentFilterSection = ({ filters, handleToggleFilter }: any): JSX.Element => {
  return (
    <Stack className='min-h-12'>
      <Typography className='font-semibold text-md'>Filter by</Typography>
      <Stack direction={'row'} spacing={4} className='flex-wrap'>
        {listFilterButton.map((button, index) => (
          <ButtonForm
            key={index}
            variant={
              button.name === 'rating'
                ? filters.rating.includes(button.value)
                  ? 'contained'
                  : 'outlined'
                : filters[button.name]
                  ? 'contained'
                  : 'outlined'
            }
            className='rounded-3xl mt-2'
            onClick={() => handleToggleFilter(button.name, button.value)}>
            {button.label}
          </ButtonForm>
        ))}
      </Stack>
    </Stack>
  );
};

export default CommentFilterSection;
